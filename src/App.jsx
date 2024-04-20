import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/navbar/Navbar";
import PlayVideo from "./Components/playVideo/PlayVideo";
import usePlaylists from "./hooks/usePlaylists";
import Home from "./page/Home";
import NotFound from "./page/NotFound";
import VideoPlaylist from "./page/VideoPlaylist";

const App = () => {
  const { getPlaylistById, playlists } = usePlaylists();
  const playlistArray = Object.values(playlists);

  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Navbar getPlaylistById={getPlaylistById} />
        <Routes>
          <Route path="/" element={<Home playlistArray={playlistArray} />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/player/:playlistId"
            element={<VideoPlaylist playlists={playlists} />}
          />
          <Route path="player/:playlistId/:videoId" element={<PlayVideo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
