import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { NoteAdd, Delete, AccessTime, CheckCircle, CheckCircleOutline } from "@mui/icons-material";
import { Box, Button, Container, Stack, Typography, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Divider, Paper, Tooltip, Skeleton } from "@mui/material";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import PlayvideoSidebar from "../playVideoSidebar/PlayvideoSidebar";

const PlayVideo = () => {
  const { videoId: id, playlistId } = useParams();
  const navigate = useNavigate();
  const playerRef = useRef(null);
  const [noteText, setNoteText] = useState("");

  const { data, loading: isLoading, notes, watchedVideos } = useStoreState((state) => state.playlists);
  const { getPlaylistData: getPlaylistById, addNote, deleteNote, toggleWatched } = useStoreActions((actions) => actions.playlists);

  useEffect(() => {
    getPlaylistById(playlistId);
  }, [playlistId]);

  if (isLoading || !data[playlistId]) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pt: 4, pb: 6 }}>
        <Container maxWidth="xl" sx={{ my: 10 }}>
          <Stack direction={{ xs: "column", lg: "row" }} spacing={4}>
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="rectangular" width="100%" sx={{ aspectRatio: '16/9', mb: 2 }} />
              <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ mb: 4 }}>
                <Skeleton variant="rectangular" width={120} height={40} />
                <Skeleton variant="rectangular" width={150} height={40} />
                <Skeleton variant="rectangular" width={120} height={40} />
              </Stack>
              <Skeleton variant="text" width="60%" height={40} />
              <Skeleton variant="text" width="30%" height={24} sx={{ mb: 2 }} />
              <Divider sx={{ mb: 2 }} />
              <Skeleton variant="text" width="100%" height={20} />
              <Skeleton variant="text" width="90%" height={20} />
            </Box>
            <Box sx={{ width: { lg: 420 } }}>
              <Skeleton variant="rectangular" width="100%" height={600} />
            </Box>
          </Stack>
        </Container>
      </Box>
    );
  }


  const { playlistItems } = data[playlistId];
  const currentIndex = playlistItems.findIndex(item => item.contentDetails.videoId === id);
  const currentItem = playlistItems[currentIndex];

  if (!currentItem) return <Box sx={{ p: 10, textAlign: "center" }}><Typography>Video not found.</Typography></Box>;

  const videoNotes = notes[id] || [];
  const isWatched = (watchedVideos[playlistId] || []).includes(id);

  const onReady = (event) => {
    playerRef.current = event.target;
  };

  const handleAddNote = () => {
    if (!noteText.trim()) return;

    const timestamp = playerRef.current ? Math.floor(playerRef.current.getCurrentTime()) : 0;
    const note = {
      text: noteText,
      timestamp,
      createdAt: new Date().toISOString(),
    };

    addNote({ videoId: id, note });
    setNoteText("");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const jumpToTime = (seconds) => {
    if (playerRef.current) {
      playerRef.current.seekTo(seconds);
      playerRef.current.playVideo();
    }
  };

  const handleNext = () => {
    if (currentIndex < playlistItems.length - 1) {
      const nextId = playlistItems[currentIndex + 1].contentDetails.videoId;
      navigate(`/player/${playlistId}/${nextId}`);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevId = playlistItems[currentIndex - 1].contentDetails.videoId;
      navigate(`/player/${playlistId}/${prevId}`);
    }
  };

  const opts = {
    width: "100%",
    height: "500px",
    playerVars: { autoplay: 0 },
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pt: 4, pb: 6 }}>
      <Container maxWidth="xl" sx={{ my: 10 }}>
        <Stack direction={{ xs: "column", lg: "row" }} spacing={4}>
          {/* Main Video Section */}
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                p: { xs: 2, md: 3 },
                borderRadius: 0,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              {/* Player */}
              <Box
                sx={{
                  overflow: "hidden",
                  borderRadius: 0,
                  boxShadow: "0 4px 20px rgba(0,0,0,.1)",
                  aspectRatio: "16/9"
                }}
              >
                <YouTube
                  videoId={id}
                  opts={opts}
                  onReady={onReady}
                  style={{ width: '100%', height: '100%' }}
                />
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
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  color="inherit"
                  sx={{ borderRadius: 0 }}
                >
                  Previous
                </Button>

                <Button
                  variant="contained"
                  startIcon={isWatched ? <CheckCircle /> : <CheckCircleOutline />}
                  onClick={() => toggleWatched({ playlistId, videoId: id })}
                  color={isWatched ? "success" : "primary"}
                  sx={{
                    borderRadius: 0,
                    px: 3,
                  }}
                >
                  {isWatched ? "Watched" : "Mark as Watched"}
                </Button>

                <Button
                  variant="outlined"
                  endIcon={<NavigateNextIcon />}
                  onClick={handleNext}
                  disabled={currentIndex === playlistItems.length - 1}
                  color="inherit"
                  sx={{ borderRadius: 0 }}
                >
                  Next
                </Button>
              </Stack>

              {/* Info */}
              <Box sx={{ mt: 4 }}>
                <Typography
                  variant="h5"
                  fontWeight={800}
                  sx={{ color: "text.primary", mb: 1, textDecoration: isWatched ? "line-through" : "none" }}
                >
                  {currentItem.title}
                </Typography>

                <Typography variant="subtitle1" color="primary.main" fontWeight={600}>
                  {data[playlistId].channelTitle}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  {data[playlistId].playlistDesc}
                </Typography>
              </Box>
            </Box>

            {/* Notes Section */}
            <Paper sx={{ mt: 4, p: 4, borderRadius: 0, boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
              <Typography variant="h6" fontWeight="bold" sx={{ color: "text.primary", mb: 3 }}>
                Video Notes
              </Typography>

              <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                <TextField
                  fullWidth
                  placeholder="Take a note... (timestamp will be saved automatically)"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddNote()}
                  variant="outlined"
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 0 } }}
                />
                <Button
                  variant="contained"
                  onClick={handleAddNote}
                  startIcon={<NoteAdd />}
                  sx={{ borderRadius: 0 }}
                >
                  Add Note
                </Button>
              </Stack>

              {videoNotes.length > 0 ? (
                <List>
                  {videoNotes.map((note, index) => (
                    <Box key={index}>
                      <ListItem
                        disablePadding
                        sx={{
                          py: 2,
                          borderRadius: 0,
                          "&:hover": { bgcolor: "grey.50" }
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography fontWeight={600} color="text.primary">
                              {note.text}
                            </Typography>
                          }
                          secondary={
                            <Button
                              size="small"
                              startIcon={<AccessTime sx={{ fontSize: 16 }} />}
                              onClick={() => jumpToTime(note.timestamp)}
                              sx={{ mt: 1, color: "primary.main", fontWeight: 700, borderRadius: 0 }}
                            >
                              Jump to {formatTime(note.timestamp)}
                            </Button>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            onClick={() => deleteNote({ videoId: id, noteIndex: index })}
                            size="small"
                            color="error"
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      {index < videoNotes.length - 1 && <Divider component="li" />}
                    </Box>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", py: 4, bgcolor: 'grey.50', borderRadius: 0 }}>
                  No notes for this video yet. Capturing notes helps in retention!
                </Typography>
              )}
            </Paper>
          </Box>

          {/* Sidebar */}
          <Box
            sx={{
              width: { xs: "100%", lg: 420 },
              bgcolor: "background.paper",
              borderRadius: 0,
              border: "1px solid",
              borderColor: "divider",
              p: 1,
              height: "fit-content",
              position: 'sticky',
              top: 24,
            }}
          >
            <PlayvideoSidebar playlists={data} currentVideoId={id} />
          </Box>
        </Stack>
      </Container>
    </Box>
  );

};


export default PlayVideo;

