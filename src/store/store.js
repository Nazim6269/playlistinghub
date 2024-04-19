import { createStore } from "easy-peasy";
import playlistModel from "./playlistModel";

const store = createStore({
  playlists: playlistModel,
});

export default store;
