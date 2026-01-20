import {
  AddCircleOutline,
  Favorite,
  History,
  PlaylistPlay,
  Search,
  Tag,
  Settings,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import DashboardCard from "../Components/dashboard/DashboardCard";
import NoPLaylistsItem from "../Components/playlistCardItem/NoPLaylistsItem";
import PlaylistCardItem from "../Components/playlistCardItem/PlaylistCardItem";
import PlaylistForm from "../Components/playlistForm/PlaylistForm";
import RecentActivityCard from "../Components/recentActivity/RecentActivityCard";

// ======component starts from here===========//
const Home = ({ getPlaylistById, playlistArray, favoritesIds = [], removePlaylist, addToFavorites, removeFromFavorites, addToRecent }) => {
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [tagDialogOpen, setTagDialogOpen] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const { tags, playlistTags, watchedVideos } = useStoreState((state) => state.playlists);
  const { addTag, removeTag, assignTagToPlaylist, removeTagFromPlaylist } = useStoreActions((actions) => actions.playlists);

  // Handle favorite toggle
  const handleFavorite = (playlistId) => {
    if (favoritesIds.includes(playlistId)) {
      removeFromFavorites?.(playlistId);
    } else {
      addToFavorites?.(playlistId);
    }
  };

  // Handle remove playlist
  const handleRemove = (playlistId) => {
    if (window.confirm("Are you sure you want to remove this playlist?")) {
      removePlaylist?.(playlistId);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      addTag(newTag.trim());
      setNewTag("");
    }
  };

  // Filter playlists based on search and category
  const filteredPlaylists = useMemo(() => {
    let filtered = [...playlistArray];

    // Apply search filter
    if (search.trim()) {
      const searchLower = search.toLowerCase().trim();
      filtered = filtered.filter((playlist) => {
        const title = (playlist.playlistTitle || "").toLowerCase();
        const channel = (playlist.channelTitle || "").toLowerCase();
        const description = (playlist.playlistDesc || "").toLowerCase();

        return (
          title.includes(searchLower) ||
          channel.includes(searchLower) ||
          description.includes(searchLower)
        );
      });
    }

    // Apply category filter (Dynamic Tags)
    if (activeCategory !== "All") {
      filtered = filtered.filter((playlist) => {
        const pTags = playlistTags[playlist.playlistId] || [];
        return pTags.includes(activeCategory);
      });
    }

    return filtered;
  }, [playlistArray, search, activeCategory, playlistTags]);

  return (
    <Box
      sx={{ minHeight: "100vh", background: "#E9F5F3", pt: 10, pb: 6, mt: 6 }}
    >
      <Container maxWidth="xl">
        {/* ================= HERO ================= */}
        <Card
          sx={{
            mb: 5,
            p: 4,
            background: "linear-gradient(135deg, #11998e, #38ef7d)",
            color: "#fff",
            borderRadius: 4,
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h5" fontWeight="bold">
                Manage your YouTube the smart way 🎯
              </Typography>

              <Typography sx={{ opacity: 0.9, mt: 1 }}>
                Save playlists, remove distractions and track learning
                productivity.
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack direction="row" spacing={2} justifyContent="md:flex-end">
                <Button
                  variant="contained"
                  startIcon={<AddCircleOutline />}
                  onClick={() => setFormOpen((prev) => !prev)}
                  sx={{
                    background: "#fff",
                    color: "#11998e",
                    fontWeight: "bold",
                    "&:hover": { background: "#e0f7f4" },
                  }}
                >
                  Add Playlist
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<Settings />}
                  onClick={() => setTagDialogOpen(true)}
                  sx={{
                    borderColor: "#fff",
                    color: "#fff",
                    "&:hover": {
                      background: "rgba(255,255,255,0.15)",
                      borderColor: "#fff",
                    },
                  }}
                >
                  Manage Tags
                </Button>
              </Stack>

              {/* Playlist form */}
              <PlaylistForm
                getPlaylistById={getPlaylistById}
                open={formOpen}
                handleClose={() => setFormOpen(false)}
              />
            </Grid>
          </Grid>
        </Card>

        {/* ================= SEARCH & FILTER ================= */}
        <Card sx={{ mb: 5, p: 3, borderRadius: 3 }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={3}
            alignItems="center"
          >
            <TextField
              placeholder="Search playlists..."
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: "#11998e" }} />,
              }}
            />

            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{ flexWrap: "wrap", alignItems: "center" }}
            >
              <Typography variant="body2" fontWeight="bold" color="text.secondary">Tags:</Typography>
              <Chip
                label="All"
                onClick={() => setActiveCategory("All")}
                sx={{
                  px: 2,
                  fontWeight: 600,
                  background: activeCategory === "All" ? "#11998e" : "#e6f6f3",
                  color: activeCategory === "All" ? "#fff" : "#11998e",
                }}
              />
              {tags.map((cat) => (
                <Chip
                  key={cat}
                  label={cat}
                  onClick={() => setActiveCategory(cat)}
                  sx={{
                    px: 2,
                    fontWeight: 600,
                    background: activeCategory === cat ? "#11998e" : "#e6f6f3",
                    color: activeCategory === cat ? "#fff" : "#11998e",
                  }}
                />
              ))}
            </Stack>
          </Stack>
        </Card>

        {/* ================= STATS CARDS ================= */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <DashboardCard
              title="Playlists"
              value={playlistArray.length}
              icon={<PlaylistPlay />}
              color="#11998e"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <DashboardCard
              title="Favorites"
              value={favoritesIds.length}
              icon={<Favorite />}
              color="#ff7675"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <DashboardCard
              title="Recents"
              value="24"
              icon={<History />}
              color="#6c5ce7"
            />
          </Grid>
        </Grid>

        {/* Playlists are renderd from here */}

        {filteredPlaylists.length > 0 ? (
          <Grid container spacing={3} sx={{ mt: 4, mb: 5 }}>
            {filteredPlaylists.map((item) => {
              const watched = watchedVideos[item.playlistId] || [];
              const total = item.playlistItems?.length || 0;

              return (
                <Grid
                  key={item.playlistId}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  sx={{ display: "flex", justifyContent: "start" }}
                >
                  <PlaylistCardItem
                    playlistId={item.playlistId}
                    playlistThumb={item.playlistThumb}
                    playlistTitle={item.playlistTitle}
                    channelTitle={item.channelTitle}
                    onFavorite={() => handleFavorite(item.playlistId)}
                    onRemove={() => handleRemove(item.playlistId)}
                    onView={() => addToRecent?.(item.playlistId)}
                    isFavorite={favoritesIds.includes(item.playlistId)}
                  />
                </Grid>
              );
            })}
          </Grid>
        ) : playlistArray.length > 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No playlists found matching your search criteria
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Try adjusting your search or category filter
            </Typography>
          </Box>
        ) : (
          <NoPLaylistsItem />
        )}

        {/* ================= RECENT ACTIVITY ================= */}
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Typography fontWeight="bold" mb={2}>
            Recent Activity
          </Typography>

          <Stack spacing={2}>
            {playlistArray.slice(0, 3).map(
              (item, i) => (
                <RecentActivityCard key={i} title={item.playlistTitle} />
              )
            )}
          </Stack>
        </Card>

        {/* Tag Management Dialog */}
        <Dialog open={tagDialogOpen} onClose={() => setTagDialogOpen(false)} fullWidth maxWidth="xs">
          <DialogTitle>Manage Custom Tags</DialogTitle>
          <DialogContent>
            <Stack direction="row" spacing={1} sx={{ mt: 2, mb: 3 }}>
              <TextField
                size="small"
                fullWidth
                placeholder="New tag name..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
              <Button variant="contained" onClick={handleAddTag} sx={{ background: "#11998e" }}>
                Add
              </Button>
            </Stack>
            <Typography variant="subtitle2" gutterBottom>Existing Tags:</Typography>
            <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => removeTag(tag)}
                  color="primary"
                  variant="outlined"
                  sx={{ borderColor: "#11998e", color: "#11998e" }}
                />
              ))}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setTagDialogOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};


//defining props
Home.propTypes = {
  getPlaylistId: PropTypes.string,
  playlistArray: PropTypes.array,
};

export default Home;
