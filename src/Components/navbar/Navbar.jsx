import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
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
              <Typography variant="h4">Youtube Projcet</Typography>
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
