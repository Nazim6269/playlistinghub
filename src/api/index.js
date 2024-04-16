import axios from "axios";

const getPlayList = async (playlistId, pageToken = "", result = []) => {
  const key = import.meta.env.VITE_YOUTUBE_API_KEY;
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

export default getPlayList;
