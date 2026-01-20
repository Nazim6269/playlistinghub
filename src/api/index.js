import axios from "axios";

const key = import.meta.env.VITE_YOUTUBE_API_KEY;

const getPlayListItem = async (playlistId, pageToken = "", result = []) => {
  const URL = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=id%2CcontentDetails%2Csnippet&playlistId=${playlistId}&maxResults=50&pageToken=${pageToken}&key=${key}`;

  try {
    const { data } = await axios.get(URL);
    result = [...result, ...data.items];

    if (data.nextPageToken) {
      return getPlayListItem(playlistId, data.nextPageToken, result);
    }
    return result;
  } catch (error) {
    console.log(error);
    return result;
  }
};

const parseDuration = (duration) => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return "00:00";

  const hours = (match[1] || "").replace("H", "");
  const minutes = (match[2] || "").replace("M", "");
  const seconds = (match[3] || "").replace("S", "");

  let result = "";
  if (hours) result += `${hours}:`;
  result += `${minutes.padStart(2, "0") || "00"}:`;
  result += `${seconds.padStart(2, "0") || "00"}`;

  if (result.startsWith(":")) result = "00" + result;
  return result;
};

const getPlayList = async (playlistId) => {
  const URL = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${key}`;

  const { data } = await axios.get(URL);
  if (!data?.items?.[0]) throw new Error("Playlist not found");

  const playlistItemsRaw = await getPlayListItem(playlistId);
  const videoIds = playlistItemsRaw.map(item => item.contentDetails.videoId);

  // Fetch video durations (limit 50 per request, but we take first 50 for simplicity or chunk it)
  // For simplicity, we fetch up to 50. If more, we should chunk.
  const videoDetailsURL = `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds.slice(0, 50).join(",")}&key=${key}`;
  const { data: videoData } = await axios.get(videoDetailsURL);

  const durationMap = {};
  videoData.items.forEach(item => {
    durationMap[item.id] = parseDuration(item.contentDetails.duration);
  });

  const {
    title: playlistTitle,
    description: playlistDesc,
    channelId,
    thumbnails,
    channelTitle,
  } = data.items[0].snippet;

  const playlistItems = playlistItemsRaw.map((item) => {
    const snippet = item.snippet;
    const thumbnails = snippet.thumbnails;
    const thumbnail = thumbnails.maxres || thumbnails.high || thumbnails.medium || thumbnails.default;
    const videoId = item.contentDetails.videoId;

    return {
      title: snippet.title,
      description: snippet.description,
      thumbnail,
      contentDetails: item.contentDetails,
      duration: durationMap[videoId] || "--:--",
    };
  });

  return {
    playlistId,
    playlistTitle,
    playlistDesc,
    playlistThumb: thumbnails.default,
    channelId,
    channelTitle,
    playlistItems,
  };
};

export default getPlayList;

