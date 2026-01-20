import { Box, CardMedia, Link, Stack, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

const PlaylistSingleVideo = ({ url, title, channelTitle, videoId, playlistId, isWatched, index, duration }) => {
  return (
    <Link
      to={`/player/${playlistId}/${videoId}`}
      component={RouterLink}
      underline="none"
      sx={{ width: "100%" }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{
          px: 1,
          py: 1,
          borderRadius: 2,
          transition: "0.2s",
          "&:hover": {
            background: "rgba(0,0,0,0.05)",
          },
        }}
      >
        {/* Index number outside */}
        <Typography
          variant="caption"
          sx={{
            minWidth: 24,
            textAlign: "center",
            fontWeight: 500,
            color: isWatched ? "#38ef7d" : "text.secondary",
          }}
        >
          {index + 1}
        </Typography>

        {/* Thumbnail Section */}
        <Box sx={{ flexShrink: 0, position: "relative", width: 160, height: 90 }}>
          <Box sx={{ position: "relative", borderRadius: 2, overflow: "hidden", width: "100%", height: "100%" }}>
            <CardMedia
              component="img"
              image={url}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: isWatched ? 0.6 : 1
              }}
            />

            {/* Duration Overlay */}
            <Box
              sx={{
                position: "absolute",
                bottom: 4,
                right: 4,
                background: "rgba(0,0,0,0.8)",
                color: "#fff",
                px: 0.5,
                py: 0.1,
                borderRadius: 0.5,
                fontSize: "0.7rem",
                fontWeight: 600,
                zIndex: 2
              }}
            >
              {duration}
            </Box>
          </Box>

          {isWatched && (
            <Box sx={{ position: "absolute", top: 4, right: 4, color: "#38ef7d", background: "#fff", borderRadius: "50%", display: "flex", zIndex: 3 }}>
              <CheckCircle sx={{ fontSize: 16 }} />
            </Box>
          )}
        </Box>

        {/* Info Section */}
        <Stack spacing={0.5} sx={{ flex: 1, minWidth: 0, ml: 1 }}>
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{
              color: isWatched ? "text.secondary" : "#0f0f0f",
              textDecoration: isWatched ? "line-through" : "none",
              fontSize: "0.85rem",
              lineHeight: 1.2,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              fontSize: "0.75rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {channelTitle}
          </Typography>
        </Stack>
      </Stack>
    </Link>
  );
};



export default PlaylistSingleVideo;
