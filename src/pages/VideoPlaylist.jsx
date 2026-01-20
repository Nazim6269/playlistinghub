import { Search, CheckCircle, CheckCircleOutline } from "@mui/icons-material";
import { Box, Button, CardMedia, CircularProgress, Container, InputAdornment, TextField, Typography, IconButton, Tooltip } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";

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
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <CircularProgress color="inherit" sx={{ color: "#11998e" }} />
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

            <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 1, color: "#11998e" }}>
              Progress: {watchedList.length} / {current.playlistItems.length} videos watched
            </Typography>

            <Box
              sx={{
                width: 120,
                height: 3,
                background: "linear-gradient(to right, #11998e, #38ef7d)",
                borderRadius: 5,
                mt: 1,
              }}
            />
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
                  <Search sx={{ color: "#11998e" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              background: "#fff",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(17,153,142,0.2)" },
                "&:hover fieldset": { borderColor: "#11998e" },
                "&.Mui-focused fieldset": { borderColor: "#11998e" },
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
                  borderRadius: 3,
                  overflow: "hidden",
                  textDecoration: "none",
                  color: "inherit",
                  background: isWatched
                    ? "rgba(17,153,142,0.05)"
                    : "linear-gradient(135deg, rgba(17,153,142,0.05), rgba(56,239,125,0.03))",
                  border: isWatched
                    ? "1px solid #11998e"
                    : "1px solid rgba(17,153,142,0.15)",
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
                    backgroundColor: isWatched ? "#38ef7d" : "#11998e",
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
                        backgroundColor: "rgba(255,255,255,0.8)",
                        "&:hover": { backgroundColor: "#fff" },
                        color: isWatched ? "#38ef7d" : "text.secondary"
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
                      opacity: isWatched ? 0.7 : 1
                    }}
                  />

                  {/* Video Info */}
                  <Box sx={{ p: 2 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      noWrap
                      sx={{ mb: 0.5, textDecoration: isWatched ? "line-through" : "none" }}
                    >
                      {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {current.channelTitle}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            );
          })}
          {filteredVideos.length === 0 && (
            <Box sx={{ gridColumn: "1 / -1", textAlign: "center", py: 4 }}>
              <Typography variant="h6" color="text.secondary">
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

