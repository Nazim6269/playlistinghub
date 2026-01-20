import { Box, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useStoreState } from "easy-peasy";
import PlaylistSingleVideo from "../playlistSingleVideo/PlaylistSingleVideo";

const PlayvideoSidebar = ({ playlists, currentVideoId }) => {
  const { playlistId } = useParams();
  const current = playlists[playlistId];
  const { watchedVideos } = useStoreState((state) => state.playlists);
  const watchedList = watchedVideos[playlistId] || [];

  if (!current) return null;
  const currentIndex = current.playlistItems.findIndex(item => item.contentDetails.videoId === currentVideoId);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        background: "#fff",
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.1)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{ color: "#0f0f0f" }}
        >
          {current.playlistTitle}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {current.channelTitle} - {currentIndex + 1}/{current.playlistItems.length}
        </Typography>
      </Box>

      {/* Scrollable List */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "calc(100vh - 250px)",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: 8,
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(0,0,0,0.1)",
            borderRadius: 4,
          },
          "&:hover::-webkit-scrollbar-thumb": {
            background: "rgba(0,0,0,0.2)",
          }
        }}
      >
        {current.playlistItems.map((item, index) => {
          const { title, thumbnail, contentDetails } = item;
          const isCurrent = contentDetails.videoId === currentVideoId;
          const isWatched = watchedList.includes(contentDetails.videoId);

          return (
            <Box
              key={contentDetails.videoId}
              sx={{
                background: isCurrent ? "rgba(0,0,0,0.05)" : "transparent",
              }}
            >
              <PlaylistSingleVideo
                url={thumbnail.url}
                title={title}
                channelTitle={current.channelTitle}
                videoId={contentDetails.videoId}
                playlistId={playlistId}
                index={index}
                isWatched={isWatched}
                duration={item.duration}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};


export default PlayvideoSidebar;

