import { createStore } from "easy-peasy";
import favoriteModel from "./favoriteModel";
import playlistModel from "./playlistModel";
import recentModel from "./recentModel";
import videoPlayModel from "./videoPlayModel";

const store = createStore({
  playlists: playlistModel,
  selectedPlaylist: videoPlayModel,
  favorites: favoriteModel,
  recents: recentModel,
});

export default store;
