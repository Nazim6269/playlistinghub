import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import PlayvideoSidebar from "../playVideoSidebar/PlayvideoSidebar";

const PlayVideo = () => {
  const { videoId: id, playlistId } = useParams();
  const playlist = useStoreActions((actions) => actions.playlists);
  const { data, loading } = useStoreState((state) => state.playlists);

  useEffect(() => {
    playlist.getPlaylistData(playlistId);
  }, [playlist, playlistId]);

  if (loading || !data[playlistId]) {
    return <div>Loading...</div>;
  }

  const { playlistItems } = data[playlistId];

  const filteredItem = playlistItems.filter(
    (item) => item.contentDetails.videoId === id
  );

  if (!filteredItem || filteredItem.length === 0) {
    return <div>Loading...</div>;
  }

  const width = 1080;
  const height = (9 / 16) * width;
  const opts = {
    width: width.toString(),
    height: height.toString(),
    playerVars: {
      autoplay: 0, // Set to 0 to prevent autoplay
    },
  };

  return (
    <Container sx={{ marginTop: 15 }}>
      <Stack direction={"row"}>
        <Box>
          <YouTube videoId={id} opts={opts} />
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Button variant="outlined" startIcon={<NavigateBeforeIcon />}>
              Previous
            </Button>
            <Button variant="outlined" endIcon={<NavigateNextIcon />}>
              Next
            </Button>
          </Stack>
          <Typography variant="h5">{filteredItem[0].title}</Typography>
          <Typography variant="body1">
            {data[playlistId].channelTitle}
          </Typography>
          <Typography variant="body1">
            {data[playlistId].playlistDesc}
          </Typography>
        </Box>
        <PlayvideoSidebar playlists={data} />
      </Stack>
    </Container>
  );
};

export default PlayVideo;
