import { action, persist, thunk } from "easy-peasy";
import getPlayList from "../api";

const playlistModel = persist({
  data: {},
  error: "",
  isLoading: false,
  addPlaylist: action((state, payload) => {
    state.data[payload.playlistId] = payload;
  }),

  setLoading: action((state, payload) => {
    state.isLoading = payload;
  }),

  setError: action((state, payload) => {
    state.error = payload;
  }),

  getPlaylistData: thunk(async (actions, playlistId, helpars) => {
    if (helpars.getState().data[playlistId]) {
      return;
    }
    setLoading(true);
    try {
      const playlist = await getPlayList(playlistId);
      actions.addPlaylist(playlist);
    } catch (error) {
      setError(error.response?.data?.error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }),
});

export default playlistModel;
