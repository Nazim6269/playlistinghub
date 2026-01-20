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
        bgcolor: 'grey.50',
        border: '1px dashed',
        borderColor: 'divider',
        borderRadius: 0,
      }}
    >
      <Typography variant="h5" fontWeight={800} color="primary.main" gutterBottom>
        No Playlists Found
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Start by adding your favorite YouTube playlists to manage them here.
      </Typography>
      <Box
        sx={{
          width: 80,
          height: 4,
          bgcolor: "primary.main",
          borderRadius: 0,
          mb: 2,
        }}
      />
    </Box>

  );
};

export default NoPLaylistsItem;
