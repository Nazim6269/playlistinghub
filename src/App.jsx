import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./Components/navbar/Navbar";
import usePlaylists from "./hooks/usePlaylists";

const App = () => {
  const { getPlaylistById, playlists } = usePlaylists();
  console.log("app", playlists);
  return (
    <>
      <CssBaseline />
      <div>
        <Navbar getPlaylistById={getPlaylistById} />
      </div>
    </>
  );
};

export default App;
