import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";
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

  if (loading || !data[playlistId]) return <div>Loading...</div>;

  const { playlistItems } = data[playlistId];
  const filteredItem = playlistItems.filter(
    (item) => item.contentDetails.videoId === id
  );

  if (!filteredItem || filteredItem.length === 0) return <div>Loading...</div>;

  const width = 960;
  const height = (9 / 16) * width;
  const opts = {
    width: width.toString(),
    height: height.toString(),
    playerVars: { autoplay: 0 },
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "#E9F5F3", pt: 4, pb: 6 }}>
      <Container maxWidth="xl" sx={{ my: 10 }}>
        <Stack direction={{ xs: "column", lg: "row" }} spacing={4}>
          {/* Main Video Section */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 2, md: 3 },
              borderRadius: 4,
              background:
                "linear-gradient(135deg, rgba(17,153,142,0.06), rgba(56,239,125,0.03))",
              border: "1px dashed rgba(17,153,142,0.25)",
            }}
          >
            {/* Player */}
            <Box
              sx={{
                overflow: "hidden",
                borderRadius: 3,
                boxShadow: "0 10px 30px rgba(0,0,0,.15)",
              }}
            >
              <YouTube videoId={id} opts={opts} />
            </Box>

            {/* Controls */}
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mt: 3 }}
            >
              <Button
                variant="outlined"
                startIcon={<NavigateBeforeIcon />}
                sx={{
                  borderRadius: 3,
                  px: 3,
                  borderColor: "#11998e",
                  color: "#11998e",
                  fontWeight: 600,
                  textTransform: "none",
                  transition: "0.25s",
                  "&:hover": {
                    background: "rgba(17,153,142,0.08)",
                    borderColor: "#11998e",
                  },
                }}
              >
                Previous
              </Button>

              <Button
                variant="outlined"
                endIcon={<NavigateNextIcon />}
                sx={{
                  borderRadius: 3,
                  px: 3,
                  borderColor: "#38ef7d",
                  color: "#11998e",
                  fontWeight: 600,
                  textTransform: "none",
                  transition: "0.25s",
                  "&:hover": {
                    background: "rgba(56,239,125,0.08)",
                    borderColor: "#38ef7d",
                  },
                }}
              >
                Next
              </Button>
            </Stack>

            {/* Info */}
            <Box sx={{ mt: 3 }}>
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{ color: "#11998e", mb: 1 }}
              >
                {filteredItem[0].title}
              </Typography>

              <Typography color="text.secondary">
                {data[playlistId].channelTitle}
              </Typography>

              <Box
                sx={{
                  width: 100,
                  height: 3,
                  background: "linear-gradient(to right, #11998e, #38ef7d)",
                  borderRadius: 5,
                  my: 2,
                }}
              />

              <Typography variant="body2" color="text.secondary">
                {data[playlistId].playlistDesc}
              </Typography>
            </Box>
          </Box>

          {/* Sidebar */}
          <Box
            sx={{
              width: { xs: "100%", lg: 380 },
              borderRadius: 4,
              background:
                "linear-gradient(135deg, rgba(17,153,142,0.04), rgba(56,239,125,0.03))",
              border: "1px solid rgba(17,153,142,0.15)",
              p: 2,
            }}
          >
            <PlayvideoSidebar playlists={data} />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default PlayVideo;
