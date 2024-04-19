import { action, persist, thunk } from "easy-peasy";
import getPlayList from "../api";

const playlistModel = persist({
  items: [],
  id: "",
  title: "",
  description: "",
  thumbnail: "",
  channelId: "",
  chanelTitle: "",
  setPlaylistData: action((state, payload) => {
    state = { ...payload };
    return state;
  }),
  getPlaylistData: thunk(async (actions, payload) => {
    const {
      playlistId,
      playlistTitle,
      playlistDesc,
      playlistThumb,
      channelId,
      channelTitle,
      playlistItems,
    } = await getPlayList(payload);

    actions.setPlaylistData({
      items: playlistItems,
      id: playlistId,
      title: playlistTitle,
      description: playlistDesc,
      thumbnail: playlistThumb,
      channelId,
      channelTitle,
    });
  }),
});

export default playlistModel;
