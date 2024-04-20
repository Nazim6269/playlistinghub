import { Container } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

const PlayVideo = () => {
  const { videoId } = useParams();
  return (
    <Container sx={{ marginTop: 20 }}>
      <iframe
        className="video"
        title="Youtube player"
        sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
        src={`https://youtube.com/embed/${videoId}?autoplay=0`}
      ></iframe>
    </Container>
  );
};

export default PlayVideo;
