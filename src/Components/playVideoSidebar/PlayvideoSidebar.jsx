import { Box, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import PlaylistSingleVideo from "../playlistSingleVideo/PlaylistSingleVideo";

const PlayvideoSidebar = ({ playlists }) => {
  const { playlistId } = useParams();
  const current = playlists[playlistId];

  if (!current) return;

  return (
    <Container
      maxWidth="lg"
      sx={{
        p: 2,
        height: "100%",
      }}
    >
      {/* Header */}
      <Typography
        variant="h6"
        fontWeight={700}
        sx={{ color: "#11998e", mb: 2 }}
      >
        Playlist Videos
      </Typography>

      {/* Scrollable List */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          maxHeight: "calc(100vh - 180px)",
          overflowY: "auto",
          pr: 1,
          "&::-webkit-scrollbar": {
            width: 6,
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(17,153,142,0.4)",
            borderRadius: 4,
          },
        }}
      >
        {current.playlistItems.map((item) => {
          const { title, thumbnail } = item;

          return (
            <Box key={item.contentDetails.videoId}>
              <PlaylistSingleVideo
                url={thumbnail.url}
                title={title}
                channelTitle={current.channelTitle}
                videoId={item.contentDetails.videoId}
              />
            </Box>
          );
        })}
      </Box>
    </Container>
  );
};

export default PlayvideoSidebar;
