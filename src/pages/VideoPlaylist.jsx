import { Box, CardMedia, Container, Typography } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";

const VideoPlaylist = ({ playlists }) => {
  const { playlistId } = useParams();
  const current = playlists[playlistId];

  if (!current) return;

  return (
    <Box
      sx={{ minHeight: "100vh", background: "#E9F5F3", pt: 10, pb: 6, mt: 6 }}
    >
      <Container maxWidth="lg">
        {/* Header Card */}
        <Box
          sx={{
            mb: 5,
            p: { xs: 3, md: 4 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            borderRadius: 4,
            background:
              "linear-gradient(135deg, rgba(17,153,142,0.08), rgba(56,239,125,0.05))",
            border: "1px dashed rgba(17,153,142,0.3)",
            alignItems: "center",
          }}
        >
          {/* Thumbnail */}
          <CardMedia
            component="img"
            image={current.playlistThumb.url}
            sx={{
              width: { xs: "100%", md: 280 },
              height: 180,
              borderRadius: 3,
              objectFit: "cover",
              boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
            }}
          />

          {/* Info */}
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{ color: "#11998e", mb: 1 }}
            >
              {current.playlistTitle}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 500 }}
            >
              {current.playlistDesc}
            </Typography>

            <Box
              sx={{
                width: 120,
                height: 3,
                background: "linear-gradient(to right, #11998e, #38ef7d)",
                borderRadius: 5,
                mt: 2,
              }}
            />
          </Box>
        </Box>

        {/* Video Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
            gap: 3,
          }}
        >
          {current.playlistItems.map((item, index) => {
            const { title, thumbnail } = item;

            return (
              <Box
                key={item.contentDetails.videoId}
                component={RouterLink}
                to={`/player/${current.playlistId}/${item.contentDetails.videoId}`}
                sx={{
                  position: "relative",
                  borderRadius: 3,
                  overflow: "hidden",
                  textDecoration: "none",
                  color: "inherit",
                  background:
                    "linear-gradient(135deg, rgba(17,153,142,0.05), rgba(56,239,125,0.03))",
                  border: "1px solid rgba(17,153,142,0.15)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px) scale(1.02)",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  },
                }}
              >
                {/* Serial Number Overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    backgroundColor: "#11998e",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 600,
                    zIndex: 2,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  }}
                >
                  {index + 1}
                </Box>

                {/* Video Thumbnail */}
                <CardMedia
                  component="img"
                  image={thumbnail.url}
                  sx={{ width: "100%", height: 160, objectFit: "cover" }}
                />

                {/* Video Info */}
                <Box sx={{ p: 2 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    noWrap
                    sx={{ mb: 0.5 }}
                  >
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {current.channelTitle}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default VideoPlaylist;
