import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const PlaylistForm = ({ open, handleClose, getPlaylistById }) => {
  const [state, setState] = useState("");

  const handleSubmit = () => {
    if (!state) {
      alert("Invalid id");
    } else {
      getPlaylistById(state);
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
          variant="outlined"
          onChange={(e) => setState(e.target.value)}
          sx={{ mt: 2, "& .MuiOutlinedInput-root": { borderRadius: 0 } }}
        />
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} sx={{ color: "text.secondary" }}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ borderRadius: 0 }}
        >
          Add Playlist
        </Button>
      </DialogActions>

    </Dialog>
  );
};

export default PlaylistForm;
