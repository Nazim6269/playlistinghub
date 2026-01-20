import {
  DeleteOutline,
  FavoriteBorderOutlined,
  Favorite,
  PlayCircleFilledOutlined,
  Add,
} from "@mui/icons-material";
import { Box, Button, Stack, Typography, LinearProgress, Chip, Menu, MenuItem } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";

const PlaylistCardItem = ({
  playlistThumb,
  playlistTitle,
  channelTitle,
  playlistId,
  onRemove,
  onView,
  isFavorite: propIsFavorite,
  onFavorite: propOnFavorite,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { watchedVideos, playlistTags, tags, data, favoritesIds } = useStoreState((state) => state.playlists);
  const { assignTagToPlaylist, removeTagFromPlaylist, toggleFavorite } = useStoreActions((actions) => actions.playlists);

  // Use store if props aren't provided or for extra data
  const isFavorite = propIsFavorite !== undefined ? propIsFavorite : (favoritesIds || []).includes(playlistId);
  const onFavorite = propOnFavorite || (() => toggleFavorite(playlistId));

  const watchedCount = (watchedVideos[playlistId] || []).length;
  const totalCount = data[playlistId]?.playlistItems?.length || 0;
  const assignedTags = playlistTags[playlistId] || [];
  const availableTags = tags || [];

  const onAssignTag = (tag) => assignTagToPlaylist({ playlistId, tag });
  const onRemoveTag = (tag) => removeTagFromPlaylist({ playlistId, tag });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const progress = totalCount > 0 ? (watchedCount / totalCount) * 100 : 0;

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        width: 280,
        m: 1,
        borderRadius: 0,
        overflow: 'hidden',
        transition: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: (theme) => `0 20px 25px -5px ${theme.palette.grey[400]}40`,
        },
      }}
    >
      {/* Thumbnail */}
      <Box sx={{ position: "relative", height: 160 }}>
        <CardMedia
          component="img"
          image={playlistThumb.url}
          alt={playlistTitle}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {/* Progress Bar Overlay */}
        <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, width: "100%" }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 4,
              backgroundColor: "rgba(0,0,0,0.1)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: progress === 100 ? "success.main" : "primary.main"
              }
            }}
          />
        </Box>
      </Box>

      {/* Content */}
      <CardContent sx={{ pb: 1, flexGrow: 1 }}>
        <Typography
          variant="subtitle1"
          fontWeight={800}
          color="text.primary"
          sx={{
            lineHeight: 1.2,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            mb: 1
          }}
        >
          {playlistTitle}
        </Typography>
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          {channelTitle}
        </Typography>

        {/* Progress Text */}
        <Typography variant="caption" sx={{ mt: 1, display: "block", fontWeight: 700, color: progress === 100 ? "success.main" : "primary.main" }}>
          {watchedCount}/{totalCount} videos completed
        </Typography>

        {/* Tags */}
        <Stack direction="row" spacing={0.5} sx={{ mt: 2, flexWrap: "wrap", gap: 0.5 }}>
          {assignedTags.map(tag => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              onDelete={() => onRemoveTag(tag)}
              color="secondary"
              variant="outlined"
              sx={{ fontSize: "0.65rem", height: 22, fontWeight: 600 }}
            />
          ))}
          <Chip
            icon={<Add sx={{ fontSize: "0.9rem !important" }} />}
            label="Tag"
            size="small"
            onClick={handleClick}
            variant="outlined"
            sx={{ fontSize: "0.65rem", height: 22, cursor: "pointer", borderStyle: 'dashed' }}
          />
        </Stack>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {availableTags.filter(tag => !assignedTags.includes(tag)).map((tag) => (
            <MenuItem key={tag} onClick={() => { onAssignTag(tag); handleClose(); }}>
              {tag}
            </MenuItem>
          ))}
          {availableTags.filter(tag => !assignedTags.includes(tag)).length === 0 && (
            <MenuItem disabled>No more tags</MenuItem>
          )}
        </Menu>
      </CardContent>

      {/* Actions */}
      <CardActions
        disableSpacing
        sx={{
          px: 2,
          pb: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        <Button
          to={`/player/${playlistId}`}
          component={Link}
          onClick={() => onView?.(playlistId)}
          fullWidth
          variant="contained"
          color="primary"
          startIcon={<PlayCircleFilledOutlined />}
          sx={{ borderRadius: 0, py: 1, boxShadow: 'none' }}
        >

          Start Tutorial
        </Button>

        <Stack direction="row" spacing={1} sx={{ width: "100%" }}>
          <Button
            onClick={onFavorite}
            variant="outlined"
            color={isFavorite ? "error" : "primary"}
            sx={{
              flex: 1,
              borderRadius: 0,
              minWidth: 0,
              bgcolor: isFavorite ? 'error.lighter' : 'transparent',
            }}
          >
            {isFavorite ? <Favorite fontSize="small" /> : <FavoriteBorderOutlined fontSize="small" />}
          </Button>

          <Button
            onClick={onRemove}
            variant="outlined"
            color="inherit"
            sx={{
              flex: 1,
              borderRadius: 0,
              minWidth: 0,
              color: 'text.secondary',
              borderColor: 'divider',
              "&:hover": { borderColor: 'error.main', color: 'error.main' }
            }}
          >
            <DeleteOutline fontSize="small" />
          </Button>
        </Stack>
      </CardActions>
    </Card >
  );
};

export default PlaylistCardItem;
