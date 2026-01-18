import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { List, ListItem, ListItemButton, ListItemText, Stack, Drawer } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import { useState } from "react";
import { NavLink, Link as RouterLink } from "react-router-dom";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

// Styled NavLink for Desktop
const MenuLink = styled(NavLink)(({ theme }) => ({
  padding: "8px 16px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: 600,
  color: "#fff", // White text on the solid background
  transition: "all 0.3s ease",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.1)",
    transform: "scale(1.05)",
  },
  "&.active": {
    background: "#fff",
    color: "#11998e",
  },
}));

// Styled NavLink for Mobile Drawer
const MobileMenuLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  color: "inherit",
  width: "100%",
  display: "block",
  padding: "12px 24px",
  borderRadius: "8px",
  fontWeight: 600,
  transition: "all 0.2s ease",
  "&.active": {
    background: "#11998e",
    color: "#fff",
  },
}));

const navItems = [
  { label: "Home", path: "/" },
  { label: "Favorites", path: "/favorites" },
  { label: "Recents", path: "/recents" },
];

//----------Navbar component starts from here-----------//
const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        p: 2,
        height: "100%",
        background: "#fff",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 4 }}
      >
        <Typography
          variant="h5"
          component={RouterLink}
          to="/"
          sx={{
            fontWeight: 800,
            textDecoration: "none",
            color: "#11998e",
            flexGrow: 1,
            textAlign: "left",
            pl: 1,
          }}
        >
          YT Manager
        </Typography>
        <IconButton
          sx={{ color: "#11998e" }}
          onClick={handleDrawerToggle}
          aria-label="close drawer"
        >
          <CloseIcon />
        </IconButton>
      </Stack>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
            <MobileMenuLink to={item.path}>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </MobileMenuLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        position="sticky"
        sx={{
          py: 0.5,
          background: "#11998e", // Solid color as requested in previous session
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Logo Section */}
            <Typography
              variant="h5"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                fontWeight: 700,
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
                fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" },
              }}
            >
              YouTube Manager
            </Typography>

            {/* Desktop Navigation */}
            <Stack
              direction="row"
              spacing={1}
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              {navItems.map((item) => (
                <MenuLink key={item.label} to={item.path}>
                  {item.label}
                </MenuLink>
              ))}
            </Stack>

            {/* Mobile Menu Toggle */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: "none" } }}
            >
              <MenuIcon fontSize="medium" />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
            borderRight: "none",
            boxShadow: "4px 0 15px rgba(0,0,0,0.1)",
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default NavBar;
