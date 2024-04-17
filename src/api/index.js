import axios from "axios";

const key = import.meta.env.VITE_YOUTUBE_API_KEY;

const getPlayListItem = async (playlistId, pageToken = "", result = []) => {
  const URL = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=id%2CcontentDetails%2Csnippet&playlistId=${playlistId}&pageToken=${pageToken}&key=${key}`;

  try {
    const { data } = await axios.get(URL);
    result = [...result, ...data.items];

    if (data.nextPageToken) {
      result = getPlayList(playlistId, data.nextPageToken, result);
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getPlayList = async (playlistId) => {
  const URL = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${key}`;

  const { data } = await axios.get(URL);
  console.log("data", data);
  let playlistItems = await getPlayListItem(playlistId);

  const {
    title: playlistTitle,
    description: playlistDesc,
    channelId,
    thumbnails,
    channelTitle,
  } = data?.items[0]?.snippet;

  playlistItems = playlistItems.map((item) => {
    const {
      title,
      description,
      thumbnails: { medium },
    } = item.snippet;

    return {
      title,
      description,
      thumbnail: medium,
      contentDetails: item.contentDetails,
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
