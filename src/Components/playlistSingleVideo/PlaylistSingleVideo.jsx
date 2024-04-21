import { CardMedia, Container, Link, Stack, Typography } from "@mui/material";
import { useStoreState } from "easy-peasy";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const PlaylistSingleVideo = ({ url, title, channelTitle, videoId }) => {
  return (
    <Container sx={{ marginBottom: 2 }}>
      <Stack direction="row">
        <Link to={`${videoId}`} component={RouterLink}>
          <CardMedia
            component="img"
            image={url}
            sx={{ height: 120, width: 220, marginRight: 1 }}
          />
        </Link>
        <Stack>
          <Typography variant="body1" fontWeight={600}>
            {title}
          </Typography>
          <Typography>{channelTitle}</Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

export default PlaylistSingleVideo;
