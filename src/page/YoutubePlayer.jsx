import { Container, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

const YoutubePlayer = ({ playlists }) => {
  const { playlistId } = useParams();
  const current = playlists[playlistId];
  if (!current) return;

  return (
    <Container maxWidth={"lg"} sx={{ my: 16 }}>
      <Typography variant="h2" align={"center"}>
        {current.playlistTitle}
      </Typography>
      <Typography>{current.playlistDesc}</Typography>
    </Container>
  );
};

export default YoutubePlayer;
