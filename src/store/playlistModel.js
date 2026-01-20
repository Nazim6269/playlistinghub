import { action, persist, thunk } from "easy-peasy";
import getPlayList from "../api";

const playlistModel = persist({
  data: {},
  error: "",
  isLoading: false,
  favoritesIds: [],
  recentPlaylists: [],
  watchedVideos: {}, // { playlistId: [videoId1, videoId2] }
  notes: {}, // { videoId: [ { text, timestamp } ] }
  tags: ["Coding", "Design", "Marketing", "Finance"], // User created tags
  playlistTags: {}, // { playlistId: [tag1, tag2] }
  projects: {}, // { id: { name, playlistIds: [] } }
  playlistOrder: [], // Ordered list of playlist IDs

  // Actions
  addPlaylist: action((state, payload) => {
    state.data[payload.playlistId] = payload;
    if (!state.playlistOrder.includes(payload.playlistId)) {
      state.playlistOrder.push(payload.playlistId);
    }
  }),


  setLoading: action((state, payload) => {
    state.isLoading = payload;
  }),

  setError: action((state, payload) => {
    state.error = payload;
  }),

  removePlaylist: action((state, payload) => {
    delete state.data[payload];
    delete state.watchedVideos[payload];
    delete state.playlistTags[payload];
    state.favoritesIds = state.favoritesIds.filter(id => id !== payload);
    state.recentPlaylists = state.recentPlaylists.filter(id => id !== payload);
    state.playlistOrder = state.playlistOrder.filter(id => id !== payload);
    // Remove from all projects
    Object.keys(state.projects).forEach(projId => {
      state.projects[projId].playlistIds = state.projects[projId].playlistIds.filter(id => id !== payload);
    });
  }),

  toggleFavorite: action((state, payload) => {
    if (state.favoritesIds.includes(payload)) {
      state.favoritesIds = state.favoritesIds.filter(id => id !== payload);
    } else {
      state.favoritesIds.push(payload);
    }
  }),

  addToRecent: action((state, payload) => {
    state.recentPlaylists = state.recentPlaylists.filter(id => id !== payload);
    state.recentPlaylists.unshift(payload);
    state.recentPlaylists = state.recentPlaylists.slice(0, 10);
  }),

  // Progress Tracking Actions
  toggleWatched: action((state, { playlistId, videoId }) => {
    if (!state.watchedVideos[playlistId]) {
      state.watchedVideos[playlistId] = [];
    }
    const index = state.watchedVideos[playlistId].indexOf(videoId);
    if (index === -1) {
      state.watchedVideos[playlistId].push(videoId);
    } else {
      state.watchedVideos[playlistId].splice(index, 1);
    }
  }),

  // Notes Actions
  addNote: action((state, { videoId, note }) => {
    if (!state.notes[videoId]) {
      state.notes[videoId] = [];
    }
    state.notes[videoId].push(note);
  }),

  deleteNote: action((state, { videoId, noteIndex }) => {
    if (state.notes[videoId]) {
      state.notes[videoId].splice(noteIndex, 1);
    }
  }),

  // Tags Actions
  addTag: action((state, tag) => {
    if (!state.tags.includes(tag)) {
      state.tags.push(tag);
    }
  }),

  removeTag: action((state, tag) => {
    state.tags = state.tags.filter((t) => t !== tag);
    // Also remove from all playlists
    Object.keys(state.playlistTags).forEach((id) => {
      state.playlistTags[id] = state.playlistTags[id].filter((t) => t !== tag);
    });
  }),

  assignTagToPlaylist: action((state, { playlistId, tag }) => {
    if (!state.playlistTags[playlistId]) {
      state.playlistTags[playlistId] = [];
    }
    if (!state.playlistTags[playlistId].includes(tag)) {
      state.playlistTags[playlistId].push(tag);
    }
  }),

  removeTagFromPlaylist: action((state, { playlistId, tag }) => {
    if (state.playlistTags[playlistId]) {
      state.playlistTags[playlistId] = state.playlistTags[playlistId].filter(
        (t) => t !== tag
      );
    }
  }),

  // Project Actions
  createProject: action((state, name) => {
    const id = Date.now().toString();
    state.projects[id] = { id, name, playlistIds: [] };
  }),

  deleteProject: action((state, projectId) => {
    delete state.projects[projectId];
  }),

  addPlaylistToProject: action((state, { projectId, playlistId }) => {
    if (state.projects[projectId] && !state.projects[projectId].playlistIds.includes(playlistId)) {
      state.projects[projectId].playlistIds.push(playlistId);
    }
  }),

  removePlaylistFromProject: action((state, { projectId, playlistId }) => {
    if (state.projects[projectId]) {
      state.projects[projectId].playlistIds = state.projects[projectId].playlistIds.filter(id => id !== playlistId);
    }
  }),

  // Reordering Actions
  reorderPlaylists: action((state, newOrder) => {
    state.playlistOrder = newOrder;
  }),

  reorderProjectPlaylists: action((state, { projectId, newOrder }) => {
    if (state.projects[projectId]) {
      state.projects[projectId].playlistIds = newOrder;
    }
  }),

  // State Import/Export Actions
  importState: action((state, newState) => {
    // Basic validation
    if (newState && typeof newState === 'object' && newState.data) {
      state.data = newState.data || {};
      state.favoritesIds = newState.favoritesIds || [];
      state.recentPlaylists = newState.recentPlaylists || [];
      state.watchedVideos = newState.watchedVideos || {};
      state.notes = newState.notes || {};
      state.tags = newState.tags || ["Coding", "Design", "Marketing", "Finance"];
      state.playlistTags = newState.playlistTags || {};
      state.projects = newState.projects || {};
      state.playlistOrder = newState.playlistOrder || Object.keys(newState.data || {});
    }
  }),

  // thunk are here
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

