import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Components/footer/Footer";
import NavBar from "./Components/navbar/NavBar";
import PlayVideo from "./Components/playVideo/PlayVideo";
import usePlaylists from "./hooks/usePlaylists";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Playlists from "./pages/Playlists";
import Recents from "./pages/Recents";
import VideoPlaylist from "./pages/VideoPlaylist";

import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useMemo } from "react";

//========== app component starts from here===============//
const App = () => {
  const { data: playlists, favoritesIds, recentPlaylists, playlistOrder } = useStoreState((state) => state.playlists);
  const {
    getPlaylistData: getPlaylistById,
    removePlaylist,
    toggleFavorite: addToFavorites,
    addToRecent,
  } = useStoreActions((actions) => actions.playlists || {});

  // Compute ordered arrays
  const playlistArray = useMemo(() => {
    if (!playlists) return [];
    const ordered = (playlistOrder || []).map(id => playlists[id]).filter(Boolean);
    const remaining = Object.values(playlists).filter(p => !playlistOrder.includes(p.playlistId));
    return [...ordered, ...remaining];
  }, [playlists, playlistOrder]);

  const favorites = useMemo(() =>
    favoritesIds?.map(id => playlists[id]).filter(Boolean) || [],
    [favoritesIds, playlists]
  );

  const recent = useMemo(() =>
    recentPlaylists?.map(id => playlists[id]).filter(Boolean) || [],
    [recentPlaylists, playlists]
  );


  // removeFromFavorites can be same as addToFavorites since it's a toggle now, 
  // but let's see if we need separate action. 
  // In playlistModel I added separate actions if needed, but toggle is easier.
  // Actually I didn't add toggleFavorite yet. Let me check playlistModel.


  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                getPlaylistById={getPlaylistById}
                playlistArray={playlistArray}
                favoritesIds={favoritesIds || []}
                removePlaylist={removePlaylist}
                addToFavorites={addToFavorites}
                removeFromFavorites={addToFavorites} // toggle handles both
                addToRecent={addToRecent}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                favoritesIds={favoritesIds || []}
                removePlaylist={removePlaylist}
                addToFavorites={addToFavorites}
                removeFromFavorites={addToFavorites}
                addToRecent={addToRecent}
              />
            }
          />
          <Route path="/recents" element={<Recents
            recentPlaylists={recent}
            favoritesIds={favoritesIds || []}
            removePlaylist={removePlaylist}
            addToFavorites={addToFavorites}
            removeFromFavorites={addToFavorites}
            addToRecent={addToRecent}
          />} />
          <Route
            path="/player/:playlistId"
            element={<VideoPlaylist />}
          />
          <Route path="/player/:playlistId/:videoId" element={<PlayVideo />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
