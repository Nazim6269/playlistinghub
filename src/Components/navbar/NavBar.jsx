import MenuIcon from "@mui/icons-material/Menu";
import { Stack } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import { NavLink, Link as RouterLink } from "react-router-dom";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

// Styled NavLink
const MenuLink = styled(NavLink)(({ theme }) => ({
  padding: "8px 16px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: 600,
  color: "#11998e", // teal → green theme
  transition: "all 0.3s ease",
  "&:hover": {
    background: "#e0f7f4",
    transform: "scale(1.05)",
  },
  "&.active": {
    background: "#38ef7d",
    color: "#fff",
  },
}));

//----------Navbar component starts from here-----------//
const NavBar = () => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        sx={{
          py: 2,
          background: "linear-gradient(90deg, #11998e, #38ef7d)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Left Section */}

            <Typography
              variant="h4"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                fontWeight: 600,
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              YouTube Manager
            </Typography>

            {/* Right Section - Button */}
            <Stack direction="row" alignItems="center" spacing={2}>
              {/* navigation stack */}
              <Stack direction="row" alignItems="center" spacing={3}>
                <MenuLink to="/">Home</MenuLink>
               
                <MenuLink to="/favorites">Favorites</MenuLink>
                <MenuLink to="/recents">Recents</MenuLink>
              </Stack>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default NavBar;
