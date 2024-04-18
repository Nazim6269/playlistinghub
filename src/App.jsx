import { Container, Stack } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./Components/navbar/Navbar";
import PlaylistCardItem from "./Components/playlistCardItem/PlaylistCardItem";
import usePlaylists from "./hooks/usePlaylists";

const App = () => {
  const { getPlaylistById, playlists } = usePlaylists();
  const playlistArray = Object.values(playlists);
  console.log(playlistArray);

  return (
    <>
      <CssBaseline />
      <Container maxWidth={"lg"} sx={{ marginTop: 16 }}>
        <Navbar getPlaylistById={getPlaylistById} />
        {playlistArray.length > 0 && (
          <Stack direction={"row"} spacing={2}>
            {playlistArray.map((item) => {
              return (
                <PlaylistCardItem
                  key={item.id}
                  playlistThumb={item.playlistThumb}
                  playlistTitle={item.playlistTitle}
                  channelTitle={item.channelTitle}
                />
              );
            })}
          </Stack>
        )}
      </Container>
    </>
  );
};

export default App;
