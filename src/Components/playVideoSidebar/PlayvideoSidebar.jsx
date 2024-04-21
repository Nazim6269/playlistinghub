import { Container } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import PlaylistSingleVideo from "../playlistSingleVideo/PlaylistSingleVideo";

const PlayvideoSidebar = ({ playlists }) => {
  const { playlistId } = useParams();
  const current = playlists[playlistId];

  if (!current) return;

  return (
    <Container maxWidth={"lg"}>
      {current.playlistItems.map((item) => {
        const { title, thumbnail } = item;

        return (
          <div key={item.contentDetails.videoId}>
            <PlaylistSingleVideo
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

export default PlayvideoSidebar;
