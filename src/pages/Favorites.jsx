import { Favorite } from "@mui/icons-material";
import { Box, Card, Container, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import PlaylistCardItem from "../Components/playlistCardItem/PlaylistCardItem";
import NoPLaylistsItem from "../Components/playlistCardItem/NoPLaylistsItem";

const Favorites = ({
  favorites = [],
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

  // Handle remove from favorites (only removes from favorites, keeps playlist)
  const handleRemove = (playlistId) => {
    removeFromFavorites?.(playlistId);
  };

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
            bgcolor: "error.main",
            color: "error.contrastText",
            borderRadius: 4,
            boxShadow: (theme) => `0 20px 25px -5px ${theme.palette.error.light}30`
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Box
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                p: 2,
                borderRadius: 3,
                display: 'flex'
              }}
            >
              <Favorite sx={{ fontSize: 40 }} />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="bold">
                My Favorite Playlists
              </Typography>
              <Typography sx={{ opacity: 0.9, mt: 0.5, fontSize: '1.1rem' }}>
                {favorites.length} playlist{favorites.length !== 1 ? "s" : ""}{" "}
                saved as favorites
              </Typography>
            </Box>
          </Box>
        </Card>

        {/* Favorites Grid */}
        {favorites.length > 0 ? (
          <Grid container spacing={3} sx={{ mt: 1, mb: 5 }}>
            {favorites.map((item) => {
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
          <Box sx={{ textAlign: "center", py: 12, bgcolor: 'background.paper', borderRadius: 4, border: '1px dashed', borderColor: 'divider' }}>
            <Favorite sx={{ fontSize: 80, color: "error.light", opacity: 0.2, mb: 2 }} />
            <Typography variant="h5" color="text.primary" fontWeight="bold">
              No Favorites Yet
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Start adding playlists to your favorites to see them here!
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};


//defining props
Favorites.propTypes = {
  favorites: PropTypes.array,
  favoritesIds: PropTypes.array,
  removePlaylist: PropTypes.func,
  addToFavorites: PropTypes.func,
  removeFromFavorites: PropTypes.func,
};

export default Favorites;
