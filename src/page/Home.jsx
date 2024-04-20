import { Container, Grid } from "@mui/material";
import { useStoreActions } from "easy-peasy";
import React, { useEffect } from "react";
import PlaylistCardItem from "../Components/playlistCardItem/PlaylistCardItem";

const id = "PL_XxuZqN0xVD0op-QDEgyXFA4fRPChvkl";
const Home = ({ playlistArray }) => {
  const playlist = useStoreActions((actions) => actions.playlists);

  useEffect(() => {
    playlist.getPlaylistData(id);
  }, []);

  return (
    <Container maxWidth={"lg"} sx={{ marginTop: 16 }}>
      {playlistArray.length > 0 && (
        <Grid container>
          {playlistArray.map((item) => {
            return (
              <Grid key={item.playlistId} item xs={12} md={6} lg={4} mb={1}>
                <PlaylistCardItem
                  playlistId={item.playlistId}
                  playlistThumb={item.playlistThumb}
                  playlistTitle={item.playlistTitle}
                  channelTitle={item.channelTitle}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
};

export default Home;
