import { Container } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";

const PlayVideo = () => {
  const { videoId } = useParams();

  // Options for the YouTube player
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0, // Set to 0 to prevent autoplay
    },
  };

  return (
    <Container sx={{ marginTop: 20 }}>
      <YouTube videoId={videoId} opts={opts} />
    </Container>
  );
};

export default PlayVideo;
