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
      sx={{ minHeight: "100vh", bgcolor: "background.default", pt: 10, pb: 6, mt: 6 }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Card
          sx={{
            mb: 5,
            p: 4,
            bgcolor: "secondary.main",
            color: "secondary.contrastText",
            borderRadius: 0,
            boxShadow: (theme) => `0 20px 25px -5px ${theme.palette.secondary.light}30`
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Box
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                p: 2,
                borderRadius: 0,
                display: 'flex'
              }}
            >
              <History sx={{ fontSize: 40 }} />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Recently Viewed Playlists
              </Typography>
              <Typography sx={{ opacity: 0.9, mt: 0.5, fontSize: '1.1rem' }}>
                {recentsToDisplay.length} playlist{recentsToDisplay.length !== 1 ? "s" : ""}{" "}
                in your recent history
              </Typography>
            </Box>
          </Box>
        </Card>

        {/* Recents Grid */}
        {recentsToDisplay.length > 0 ? (
          <Grid container spacing={3} sx={{ mt: 1, mb: 5 }}>
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
          <Box sx={{ textAlign: "center", py: 12, bgcolor: 'background.paper', borderRadius: 0, border: '1px dashed', borderColor: 'divider' }}>
            <History sx={{ fontSize: 80, color: "secondary.light", opacity: 0.2, mb: 2 }} />
            <Typography variant="h5" color="text.primary" fontWeight="bold">
              No Recent Playlists
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
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
