import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const PlaylistForm = ({ open, handleClose, getPlaylistId }) => {
  const [state, setState] = useState("");

  const handleSubmit = () => {
    if (!state) {
      alert("Invalid id");
    } else {
      getPlaylistId(state);
      setState("");
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Add Plalist
      </DialogTitle>

      <DialogContent dividers>
        <DialogContentText>
          To add a new playlist please insert a playlist id or link
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          label="Playlist id or Link"
          fullWidth
          variant="standard"
          onChange={(e) => setState(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" onClick={handleSubmit}>
          Add Plalist
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlaylistForm;
