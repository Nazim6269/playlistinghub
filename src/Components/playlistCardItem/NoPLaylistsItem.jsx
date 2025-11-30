import { Box, Typography } from "@mui/material";

const NoPLaylistsItem = () => {
  return (
    <Box
      sx={{
        py: 12,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "rgba(17, 153, 142, 0.05)",
        borderRadius: 3,
      }}
    >
      <Typography variant="h5" fontWeight="bold" color="#11998e" gutterBottom>
        No playlists yet
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        You haven&apos;t added any playlists. Start by clicking the Add Playlist
        button above.
      </Typography>
      <Box
        sx={{
          width: { xs: "60%", sm: "40%", md: "30%" },
          height: 2,
          background: "#11998e",
          borderRadius: 1,
          mb: 2,
        }}
      />
    </Box>
  );
};

export default NoPLaylistsItem;
