import { CardMedia, Container, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import PlaylistSingleVedio from "../Components/playlistSingleVedio/PlaylistSingleVedio";

const VideoPlaylist = ({ playlists }) => {
  const { playlistId } = useParams();
  const current = playlists[playlistId];

  if (!current) return;

  return (
    <Container maxWidth={"lg"} sx={{ my: 16 }}>
      <CardMedia
        component={"img"}
        image={current.playlistThumb.url}
        sx={{ height: 200, width: 440 }}
      />
      <Typography variant="h4">{current.playlistTitle}</Typography>
      <Typography>{current.playlistDesc}</Typography>

      {current.playlistItems.map((item) => {
        const { title, thumbnail } = item;

        return (
          <div key={item.contentDetails.videoId}>
            <PlaylistSingleVedio
              key={item.contentDetails.videoId}
              url={thumbnail.url}
              title={title}
              channelTitle={current.channelTitle}
              videoId={item.contentDetails.videoId}
            />
          </div>
        );
      })}
    </Container>
  );
};

export default VideoPlaylist;
