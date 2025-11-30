import { Box, Button, Container, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const NotFound = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 3,
      }}
    >
      <Box
        sx={{
          p: 6,
          borderRadius: 4,
          background:
            "linear-gradient(135deg, rgba(17,153,142,0.06), rgba(56,239,125,0.03))",
          border: "1px dashed rgba(17,153,142,0.3)",
        }}
      >
        <Typography
          variant="h1"
          fontWeight={700}
          sx={{ color: "#11998e", mb: 2 }}
        >
          404
        </Typography>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Page Not Found
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: 400, mx: "auto" }}
        >
          The page you are looking for does not exist. It might have been moved
          or deleted.
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to="/"
          sx={{
            background: "linear-gradient(to right, #11998e, #38ef7d)",
            color: "#fff",
            fontWeight: 600,
            px: 4,
            py: 1.5,
            borderRadius: 3,
            "&:hover": {
              background: "linear-gradient(to right, #38ef7d, #11998e)",
            },
          }}
        >
          Go Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
