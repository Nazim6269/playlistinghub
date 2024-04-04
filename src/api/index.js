import axios from "axios";

const key = "AIzaSyApxOkxvIY3ku0_sHE2JSHLOhBhbFuhxbU";
const getPlayList = async (playlistId, pageToken = "", result = []) => {
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
