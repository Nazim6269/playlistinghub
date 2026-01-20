import { Search, CheckCircle, CheckCircleOutline } from "@mui/icons-material";
import { Box, Button, CardMedia, CircularProgress, Container, InputAdornment, TextField, Typography, IconButton, Tooltip, Grid, Skeleton } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import VideoSkeleton, { VideoHeaderSkeleton } from "../Components/playlistCardItem/VideoSkeleton";

const VideoPlaylist = () => {
  const { playlistId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const { data: playlists, watchedVideos, isLoading, error } = useStoreState((state) => state.playlists);
  const { getPlaylistData: getPlaylistById, toggleWatched } = useStoreActions((actions) => actions.playlists);

  const current = playlists[playlistId];

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (!current && getPlaylistById) {
      getPlaylistById(playlistId);
    }
  }, [playlistId, current, getPlaylistById]);

  const filteredVideos = useMemo(() => {
    if (!current?.playlistItems) return [];
    if (!debouncedQuery.trim()) return current.playlistItems;

    const query = debouncedQuery.toLowerCase().trim();
    return current.playlistItems.filter((item) =>
      item.title.toLowerCase().includes(query)
    );
  }, [current, debouncedQuery]);

  if (isLoading && !current) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pt: 10, pb: 6, mt: 6 }}>
        <Container maxWidth="lg">
          <VideoHeaderSkeleton />
          <Box sx={{ mb: 4 }}>
            <Skeleton variant="rectangular" width="100%" height={56} sx={{ mb: 1 }} />
            <Skeleton variant="text" width={150} height={20} />
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
              gap: 3,
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <VideoSkeleton key={i} />
            ))}
          </Box>
        </Container>
      </Box>
    );
  }


  if (error || !current) {
    return (
      <Box sx={{ p: 10, textAlign: "center", minHeight: "80vh", mt: 10 }}>
        <Typography variant="h5" color="error" gutterBottom>
          {error || "Playlist not found or could not be loaded."}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, mb: 4 }}>
          Make sure the playlist ID <strong>{playlistId}</strong> is correct and public.
        </Typography>
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          sx={{ background: "#11998e", "&:hover": { background: "#0e7a71" } }}
        >
          Go Back Home
        </Button>
      </Box>
    );
  }

  const watchedList = watchedVideos[playlistId] || [];

  return (
    <Box
      sx={{ minHeight: "100vh", bgcolor: "background.default", pt: 10, pb: 6, mt: 6 }}
    >
      <Container maxWidth="lg">
        {/* Header Card */}
        <Box
          sx={{
            mb: 5,
            p: { xs: 3, md: 4 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            borderRadius: 0,
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
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
              borderRadius: 0,
              objectFit: "cover",
            }}
          />

          {/* Info */}
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{ color: "text.primary", mb: 1 }}
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

            <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2, color: "primary.main" }}>
              Progress: {watchedList.length} / {current.playlistItems.length} videos completed
            </Typography>
          </Box>
        </Box>

        {/* Search Bar */}
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search videos in this playlist..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "primary.main" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              bgcolor: "background.paper",
              borderRadius: 0,
              "& .MuiOutlinedInput-root": {
                borderRadius: 0,
              },
            }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, ml: 1 }}>
            Showing {filteredVideos.length} of {current.playlistItems.length} videos
          </Typography>
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
          {filteredVideos.map((item, index) => {
            const { title, thumbnail, contentDetails } = item;
            const isWatched = watchedList.includes(contentDetails.videoId);

            return (
              <Box
                key={contentDetails.videoId}
                sx={{
                  position: "relative",
                  borderRadius: 0,
                  overflow: "hidden",
                  textDecoration: "none",
                  color: "inherit",
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: isWatched ? "success.main" : "divider",
                  transition: "0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: (theme) => `0 10px 20px -5px ${theme.palette.grey[300]}`,
                  },
                }}
              >
                {/* Serial Number Overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    width: 28,
                    height: 28,
                    borderRadius: 0,
                    backgroundColor: isWatched ? "success.main" : "primary.main",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    zIndex: 2,
                  }}
                >
                  {index + 1}
                </Box>

                {/* Mark as Watched Button */}
                <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 2 }}>
                  <Tooltip title={isWatched ? "Mark as unwatched" : "Mark as watched"}>
                    <IconButton
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWatched({ playlistId, videoId: contentDetails.videoId });
                      }}
                      sx={{
                        backgroundColor: "rgba(255,255,255,0.9)",
                        "&:hover": { backgroundColor: "#fff" },
                        color: isWatched ? "success.main" : "text.secondary",
                        borderRadius: 0
                      }}
                      size="small"
                    >
                      {isWatched ? <CheckCircle /> : <CheckCircleOutline />}
                    </IconButton>
                  </Tooltip>
                </Box>

                {/* Video Thumbnail */}
                <Box
                  component={RouterLink}
                  to={`/player/${current.playlistId}/${contentDetails.videoId}`}
                  sx={{ textDecoration: "none", color: "inherit" }}
                >
                  <CardMedia
                    component="img"
                    image={thumbnail.url}
                    sx={{
                      width: "100%",
                      height: 160,
                      objectFit: "cover",
                      opacity: isWatched ? 0.7 : 1,
                      borderRadius: 0
                    }}
                  />

                  {/* Video Info */}
                  <Box sx={{ p: 2 }}>
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      sx={{
                        mb: 0.5,
                        lineHeight: 1.3,
                        textDecoration: isWatched ? "line-through" : "none",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        color: isWatched ? "text.secondary" : "text.primary"
                      }}
                    >
                      {title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                      {current.channelTitle}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            );
          })}
          {filteredVideos.length === 0 && (
            <Box sx={{ gridColumn: "1 / -1", textAlign: "center", py: 8, bgcolor: 'background.paper', border: '1px dashed', borderColor: 'divider' }}>
              <Typography variant="h6" color="text.secondary" fontWeight={700}>
                No videos found matching "{debouncedQuery}"
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );

};

export default VideoPlaylist;

