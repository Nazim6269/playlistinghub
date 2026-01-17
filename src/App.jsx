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

//========== app component starts from here===============//
const App = () => {
  const { 
    getPlaylistById, 
    playlists, 
    favorites, 
    favoritesIds, 
    removePlaylist, 
    addToFavorites, 
    removeFromFavorites,
    recentPlaylists,
    addToRecent
  } = usePlaylists();
  const playlistArray = Object.values(playlists);

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
                favoritesIds={favoritesIds}
                removePlaylist={removePlaylist}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
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
                favoritesIds={favoritesIds}
                removePlaylist={removePlaylist}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                addToRecent={addToRecent}
              />
            }
          />
          <Route path="/recents" element={<Recents 
            recentPlaylists={recentPlaylists}
            favoritesIds={favoritesIds}
            removePlaylist={removePlaylist}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            addToRecent={addToRecent}
          />} />
          <Route
            path="/player/:playlistId"
            element={<VideoPlaylist playlists={playlists} />}
          />
          <Route path="/player/:playlistId/:videoId" element={<PlayVideo />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
