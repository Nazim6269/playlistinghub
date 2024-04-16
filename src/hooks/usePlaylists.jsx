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
    let result;
    try {
      result = await getPlayList(playlistId);
      setError("");
    } catch (error) {
      setError(error.response?.data?.error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }

    let cid, ct;

    result = result.map((item) => {
      const {
        channelId,
        title,
        description,
        thumbnails: { medium },
        channelTitle,
      } = item.snippet;

      if (!cid) {
        cid = channelId;
      }

      if (!ct) {
        ct = channelTitle;
      }

      return {
        title,
        description,
        thumbnail: medium,
        contentDetails: item.contentDetails,
      };
    });

    setState((prev) => ({
      ...prev,
      playlists: {
        ...prev.playlists,
        [playlistId]: result,
      },
    }));
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
