import {
  AppBar,
  Box,
  Button,
  Container,
  Link,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { Link as RouterLink } from "react-router-dom";
import PlaylistForm from "../playlistForm/PlaylistForm";

const Navbar = ({ getPlaylistById }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getPlaylistId = (id) => {
    getPlaylistById(id);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="default" sx={{ py: 2 }}>
        <Container maxWidth={"lg"}>
          <Toolbar>
            <Stack sx={{ flexGrow: 1 }}>
              <Link
                to={"/"}
                component={RouterLink}
                sx={{ textDecoration: "none", color: "black" }}
              >
                <Typography variant="h4">Youtube Projcet</Typography>
              </Link>
              <Typography variant="body1">By Stack Learner</Typography>
            </Stack>
            <Button variant={"contained"} onClick={handleClickOpen}>
              Add Playlist
            </Button>
            <PlaylistForm
              handleClose={handleClose}
              open={open}
              getPlaylistId={getPlaylistId}
            />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;
