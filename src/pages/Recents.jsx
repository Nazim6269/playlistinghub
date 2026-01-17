import { History } from "@mui/icons-material";
import { Box, Card, Container, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import PlaylistCardItem from "../Components/playlistCardItem/PlaylistCardItem";
import NoPLaylistsItem from "../Components/playlistCardItem/NoPLaylistsItem";

const Recents = ({
  recentPlaylists = [],
  favoritesIds = [],
  removePlaylist,
  addToFavorites,
  removeFromFavorites,
  addToRecent,
}) => {
  // Handle favorite toggle
  const handleFavorite = (playlistId) => {
    if (favoritesIds.includes(playlistId)) {
      removeFromFavorites?.(playlistId);
    } else {
      addToFavorites?.(playlistId);
    }
  };

  // Handle remove from recents
  const handleRemove = (playlistId) => {
    removePlaylist?.(playlistId);
  };

  // Remove duplicates and keep only most recent (reverse order for display)
  const uniqueRecents = Array.from(new Set(recentPlaylists.map((p) => p.playlistId)))
    .slice(-10) // Keep last 10
    .reverse(); // Most recent first

  const recentsToDisplay = uniqueRecents
    .map((id) => recentPlaylists.find((p) => p.playlistId === id))
    .filter(Boolean);

  return (
    <Box
      sx={{ minHeight: "100vh", background: "#E9F5F3", pt: 10, pb: 6, mt: 6 }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Card
          sx={{
            mb: 5,
            p: 4,
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "#fff",
            borderRadius: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <History sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Recently Viewed Playlists
              </Typography>
              <Typography sx={{ opacity: 0.9, mt: 1 }}>
                {recentsToDisplay.length} playlist{recentsToDisplay.length !== 1 ? "s" : ""}{" "}
                in your recent history
              </Typography>
            </Box>
          </Box>
        </Card>

        {/* Recents Grid */}
        {recentsToDisplay.length > 0 ? (
          <Grid container spacing={3} sx={{ mt: 4, mb: 5 }}>
            {recentsToDisplay.map((item) => {
              // Filter out undefined items
              if (!item || !item.playlistId) return null;

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
        ) : (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <History sx={{ fontSize: 80, color: "#667eea", opacity: 0.3, mb: 2 }} />
            <Typography variant="h5" color="text.secondary" fontWeight="bold">
              No Recent Playlists
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              Start viewing playlists to see them in your recent history!
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

// Defining props
Recents.propTypes = {
  recentPlaylists: PropTypes.array,
  favoritesIds: PropTypes.array,
  removePlaylist: PropTypes.func,
  addToFavorites: PropTypes.func,
  removeFromFavorites: PropTypes.func,
  addToRecent: PropTypes.func,
};

export default Recents;
