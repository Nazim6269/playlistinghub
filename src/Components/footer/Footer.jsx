import { Box, Container, Link, Stack, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        py: 6,
        bgcolor: "primary.main",
        color: "primary.contrastText",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >

      <Container maxWidth="xl">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={4}
        >
          {/* Left: Branding */}
          <Stack spacing={1} alignItems={{ xs: "center", sm: "flex-start" }}>
            <Typography variant="h4" fontWeight={600}>
              YouTube Manager
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Your Mission
            </Typography>
          </Stack>

          {/* Center: Quick Links */}
          <Stack
            direction="row"
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            <Link
              href="#favorites"
              underline="none"
              sx={{
                color: "#fff",
                "&:hover": { opacity: 0.8, transform: "scale(1.05)" },
                transition: "all 0.3s ease",
              }}
            >
              Favorites
            </Link>
            <Link
              href="#playlists"
              underline="none"
              sx={{
                color: "#fff",
                "&:hover": { opacity: 0.8, transform: "scale(1.05)" },
                transition: "all 0.3s ease",
              }}
            >
              Playlists
            </Link>
            <Link
              href="#recents"
              underline="none"
              sx={{
                color: "#fff",
                "&:hover": { opacity: 0.8, transform: "scale(1.05)" },
                transition: "all 0.3s ease",
              }}
            >
              Recents
            </Link>
          </Stack>
        </Stack>

        {/* Optional: Bottom row */}
        <Typography
          variant="body2"
          sx={{ mt: 4, textAlign: "center", opacity: 0.7 }}
        >
          © {new Date().getFullYear()} YouTube Manager. All rights reserved by
          NazimUddin.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
