import { useState } from "react";
import getPlayList from "../api";

const usePlaylists = () => {
  const [state, setState] = useState({
    playlists: {},
    recentPlaylists: [],
    favorites: [],
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getPlaylistById = async (playlistId, force = false) => {
    if (state.playlists[playlistId] && !force) {
      return;
    }

    setIsLoading(true);

    try {
      const playlist = await getPlayList(playlistId);

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
    setState((prev) => ({
      ...prev,
      favorites: [...prev, playlistId],
    }));
  };

  const addToRecent = (playlistId) => {
    setState((prev) => ({
      ...prev,
      recentPlaylists: [...prev, playlistId],
    }));
  };

  const getPlaylistsByIds = (ids = []) => {
    return ids.map((id) => state.playlists[id]);
  };

  return {
    playlists: state.playlists,
    favorites: getPlaylistsByIds(state.favorites),
    recentPlaylists: getPlaylistsByIds(state.recentPlaylists),
    error,
    isLoading,
    getPlaylistById,
    addToRecent,
    addToFavorites,
  };
};

export default usePlaylists;
