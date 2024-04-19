import { action, persist, thunk } from "easy-peasy";
import getPlayList from "../api";

const playlistModel = persist({
  data: {},
  addPlaylist: action((state, payload) => {
    state.data[payload.playlistId] = payload;
  }),

  getPlaylistData: thunk(async (actions, playlistId, helpars) => {
    if (helpars.getState().data[playlistId]) {
      console.log("api called cancelled");
      return;
    }

    const playlist = await getPlayList(playlistId);
    actions.addPlaylist(playlist);
    console.log("api called");
  }),
});

export default playlistModel;
