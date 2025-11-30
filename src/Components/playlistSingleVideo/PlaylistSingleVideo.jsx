import { Box, CardMedia, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const PlaylistSingleVideo = ({ url, title, channelTitle, videoId }) => {
  return (
    <Link
      to={`${videoId}`}
      component={RouterLink}
      underline="none"
      sx={{ width: "100%" }}
    >
      <Stack
        direction="row"
        sx={{
          gap: 2,
          px: 1.5,
          alignItems: "center",
          borderRadius: 3,
          transition: "0.25s ease",
          "&:hover": {
            background:
              "linear-gradient(135deg, rgba(17,153,142,0.08), rgba(56,239,125,0.05))",
          },
        }}
      >
        {/* Thumbnail */}
        <Box sx={{ flexShrink: 0 }}>
          <CardMedia
            component="img"
            image={url}
            sx={{
              width: 200,
              height: 115,
              borderRadius: 2,
              objectFit: "cover",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            }}
          />
        </Box>

        {/* Info */}
        <Stack spacing={0.5} sx={{ overflow: "hidden" }}>
          <Typography
            variant="body1"
            fontWeight={600}
            noWrap
            sx={{ color: "text.primary" }}
          >
            {title}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {channelTitle}
          </Typography>
        </Stack>
      </Stack>
    </Link>
  );
};

export default PlaylistSingleVideo;
