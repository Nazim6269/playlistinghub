import { DialogContentText, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

const PlaylistForm = ({ open, handleClose }) => {
  const [state, setState] = useState("");
  return (
    <Dialog open={open} onClick={handleClose}>
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
          id="name"
          name="email"
          label="Playlist id or Link"
          fullWidth
          variant="standard"
          onChange={(e) => setState(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button>Cancel</Button>
        <Button type="submit">Add Plalist</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlaylistForm;
