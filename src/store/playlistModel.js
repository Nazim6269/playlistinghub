import { action, persist, thunk } from "easy-peasy";
import getPlayList from "../api";

const playlistModel = persist({
  data: {},
  error: "",
  isLoading: false,
  //actions are here
  addPlaylist: action((state, payload) => {
    state.data[payload.playlistId] = payload;
  }),

  setLoading: action((state, payload) => {
    state.isLoading = payload;
  }),

  setError: action((state, payload) => {
    state.error = payload;
  }),

  removePlaylist: action((state, payload) => {
    delete state.data[payload];
  }),

  //thunk are here
  getPlaylistData: thunk(async (actions, playlistId, helpers) => {
    if (helpers.getState().data[playlistId]) {
      return;
    }
    actions.setLoading(true);
    try {
      const playlist = await getPlayList(playlistId);
      actions.addPlaylist(playlist);
    } catch (error) {
      actions.setError(
        error.response?.data?.error?.message || "Something went wrong"
      );
    } finally {
      actions.setLoading(false);
    }
  }),
});

export default playlistModel;
