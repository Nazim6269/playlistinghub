import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { NoteAdd, Delete, AccessTime, CheckCircle, CheckCircleOutline } from "@mui/icons-material";
import { Box, Button, Container, Stack, Typography, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Divider, Paper, Tooltip } from "@mui/material";
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

  const { data, loading, notes, watchedVideos } = useStoreState((state) => state.playlists);
  const { getPlaylistData: getPlaylistById, addNote, deleteNote, toggleWatched } = useStoreActions((actions) => actions.playlists);

  useEffect(() => {
    getPlaylistById(playlistId);
  }, [playlistId]);

  if (loading || !data[playlistId]) return <Box sx={{ p: 10, textAlign: "center" }}><Typography>Loading...</Typography></Box>;

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

  const width = "100%";
  const opts = {
    width: "100%",
    height: "500px",
    playerVars: { autoplay: 0 },
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "#E9F5F3", pt: 4, pb: 6 }}>
      <Container maxWidth="xl" sx={{ my: 10 }}>
        <Stack direction={{ xs: "column", lg: "row" }} spacing={4}>
          {/* Main Video Section */}
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
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
                  sx={{
                    borderRadius: 3,
                    px: 3,
                    borderColor: "#11998e",
                    color: "#11998e",
                    fontWeight: 600,
                    textTransform: "none",
                  }}
                >
                  Previous
                </Button>

                <Button
                  variant="contained"
                  startIcon={isWatched ? <CheckCircle /> : <CheckCircleOutline />}
                  onClick={() => toggleWatched({ playlistId, videoId: id })}
                  sx={{
                    borderRadius: 3,
                    px: 3,
                    background: isWatched ? "#38ef7d" : "#11998e",
                    color: "#fff",
                    fontWeight: 600,
                    textTransform: "none",
                    "&:hover": { background: isWatched ? "#2ecc71" : "#0e7a71" }
                  }}
                >
                  {isWatched ? "Watched" : "Mark as Watched"}
                </Button>

                <Button
                  variant="outlined"
                  endIcon={<NavigateNextIcon />}
                  onClick={handleNext}
                  disabled={currentIndex === playlistItems.length - 1}
                  sx={{
                    borderRadius: 3,
                    px: 3,
                    borderColor: "#38ef7d",
                    color: "#11998e",
                    fontWeight: 600,
                    textTransform: "none",
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
                  sx={{ color: "#11998e", mb: 1, textDecoration: isWatched ? "line-through" : "none" }}
                >
                  {currentItem.title}
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

            {/* Notes Section */}
            <Paper sx={{ mt: 4, p: 3, borderRadius: 4, background: "#fff" }}>
              <Typography variant="h6" fontWeight="bold" sx={{ color: "#11998e", mb: 2 }}>
                Video Notes
              </Typography>

              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  placeholder="Take a note... (timestamp will be saved automatically)"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddNote()}
                  variant="outlined"
                  size="small"
                />
                <Button
                  variant="contained"
                  onClick={handleAddNote}
                  startIcon={<NoteAdd />}
                  sx={{ background: "#11998e", borderRadius: 2 }}
                >
                  Add
                </Button>
              </Stack>

              <Divider sx={{ mb: 2 }} />

              {videoNotes.length > 0 ? (
                <List>
                  {videoNotes.map((note, index) => (
                    <ListItem
                      key={index}
                      disablePadding
                      sx={{
                        mb: 1,
                        p: 1.5,
                        borderRadius: 2,
                        "&:hover": { background: "rgba(17,153,142,0.05)" }
                      }}
                    >
                      <ListItemText
                        primary={note.text}
                        secondary={
                          <Typography
                            variant="caption"
                            sx={{ color: "#11998e", cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center", mt: 0.5 }}
                            onClick={() => jumpToTime(note.timestamp)}
                          >
                            <AccessTime sx={{ fontSize: 14, mr: 0.5 }} />
                            Jump to {formatTime(note.timestamp)}
                          </Typography>
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={() => deleteNote({ videoId: id, noteIndex: index })}
                          size="small"
                          sx={{ color: "#ff7675" }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", py: 2 }}>
                  No notes for this video yet.
                </Typography>
              )}
            </Paper>
          </Box>

          {/* Sidebar */}
          <Box
            sx={{
              width: { xs: "100%", lg: 420 },
              borderRadius: 4,
              background:
                "linear-gradient(135deg, rgba(17,153,142,0.04), rgba(56,239,125,0.03))",
              border: "1px solid rgba(17,153,142,0.15)",
              p: 2,
              height: "fit-content"
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

