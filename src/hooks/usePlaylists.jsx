import { useEffect, useState } from "react";
import getPlayList from "../api";
import storage from "../utils/storage";

const STORAGE_KEY = "yp__playlist__";
const INIT_STATE = {
  playlists: {},
  recentPlaylists: [],
  favorites: [],
};

const usePlaylists = () => {
  const [state, setState] = useState(INIT_STATE);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const state = storage.get(STORAGE_KEY);
    if (state) {
      setState({ ...state });
    }
  }, []);

  useEffect(() => {
    if (state !== INIT_STATE) {
      storage.save(STORAGE_KEY, state);
    }
  }, [state]);

  const getPlaylistById = async (playlistId, force = false) => {
    if (state.playlists[playlistId] && !force) {
      return;
    }

    setIsLoading(true);

    try {
      const playlist = await getPlayList(playlistId);
      console.log(playlist, "usePlaylist");

      setError("");
      setState((prev) => ({
        ...prev,
        playlists: {
          ...prev.playlists,
          [playlistId]: playlist,
        },
      }));
    } catch (error) {
      setError(error.response?.data?.error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const addToFavorites = (playlistId) => {
    setState((prev) => {
      // Avoid duplicates
      if (prev.favorites.includes(playlistId)) {
        return prev;
      }
      return {
        ...prev,
        favorites: [...prev.favorites, playlistId],
      };
    });
  };

  const removeFromFavorites = (playlistId) => {
    setState((prev) => ({
      ...prev,
      favorites: prev.favorites.filter((id) => id !== playlistId),
    }));
  };

  const removePlaylist = (playlistId) => {
    setState((prev) => {
      const newPlaylists = { ...prev.playlists };
      delete newPlaylists[playlistId];
      return {
        ...prev,
        playlists: newPlaylists,
        favorites: prev.favorites.filter((id) => id !== playlistId),
        recentPlaylists: prev.recentPlaylists.filter((id) => id !== playlistId),
      };
    });
  };

  const addToRecent = (playlistId) => {
    setState((prev) => ({
      ...prev,
      recentPlaylists: [...prev.recentPlaylists, playlistId],
    }));
  };

  const getPlaylistsByIds = (ids = []) => {
    return ids.map((id) => state.playlists[id]);
  };

  return {
    playlists: state.playlists,
    favorites: getPlaylistsByIds(state.favorites),
    favoritesIds: state.favorites,
    recentPlaylists: getPlaylistsByIds(state.recentPlaylists),
    error,
    isLoading,
    getPlaylistById,
    addToRecent,
    addToFavorites,
    removeFromFavorites,
    removePlaylist,
  };
};

export default usePlaylists;
