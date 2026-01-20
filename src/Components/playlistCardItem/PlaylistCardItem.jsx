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
        borderRadius: 3,
        transition: "0.3s",
        boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* Thumbnail */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          image={playlistThumb.url}
          alt={playlistTitle}
          sx={{
            width: "100%",
            height: 180,
            objectFit: "cover",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        />
        {/* Progress Bar Overlay */}
        <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, width: "100%" }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 6,
              backgroundColor: "rgba(255,255,255,0.3)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#38ef7d"
              }
            }}
          />
        </Box>
      </Box>

      {/* Content */}
      <CardContent sx={{ pb: 1 }}>
        <Typography variant="h6" color="text.primary" noWrap>
          {playlistTitle.length > 40
            ? playlistTitle.substr(0, 40) + "..."
            : playlistTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {channelTitle}
        </Typography>

        {/* Progress Text */}
        <Typography variant="caption" sx={{ mt: 1, display: "block", fontWeight: "bold", color: "#11998e" }}>
          {watchedCount}/{totalCount} videos completed
        </Typography>

        {/* Tags */}
        <Stack direction="row" spacing={0.5} sx={{ mt: 1, flexWrap: "wrap", gap: 0.5 }}>
          {assignedTags.map(tag => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              onDelete={() => onRemoveTag(tag)}
              sx={{ fontSize: "0.65rem", height: 20 }}
            />
          ))}
          <Chip
            icon={<Add sx={{ fontSize: "1rem !important" }} />}
            label="Tag"
            size="small"
            onClick={handleClick}
            variant="outlined"
            sx={{ fontSize: "0.65rem", height: 20, cursor: "pointer" }}
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

      <Box sx={{ flexGrow: 1 }} />

      {/* Actions */}
      <CardActions
        disableSpacing
        sx={{
          px: 2,
          pb: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {/* Start Tutorial */}
        <Button
          to={`/player/${playlistId}`}
          component={Link}
          onClick={() => onView?.(playlistId)}
          fullWidth
          sx={{
            textTransform: "none",
            fontWeight: 600,
            color: "#fff",
            background: "linear-gradient(135deg, #11998e, #38ef7d)",
            borderRadius: 3,
            "&:hover": {
              opacity: 0.9,
            },
            minWidth: 0,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            justifyContent="center"
          >
            <PlayCircleFilledOutlined />
            <Typography variant="body2" fontWeight={600}>
              Start Tutorial
            </Typography>
          </Stack>
        </Button>

        <Stack direction="row" spacing={1} sx={{ width: "100%" }}>
          {/* Favorite */}
          <Button
            onClick={onFavorite}
            sx={{
              flex: 1,
              textTransform: "none",
              fontWeight: 600,
              color: isFavorite ? "#ff6b81" : "#ff6b81",
              borderRadius: 3,
              border: "1px solid #ff6b81",
              background: isFavorite ? "rgba(255,107,129,0.1)" : "transparent",
              "&:hover": {
                background: "rgba(255,107,129,0.15)",
              },
              minWidth: 0,
            }}
          >
            {isFavorite ? <Favorite fontSize="small" /> : <FavoriteBorderOutlined fontSize="small" />}
          </Button>

          {/* Remove */}
          <Button
            onClick={onRemove}
            sx={{
              flex: 1,
              textTransform: "none",
              fontWeight: 600,
              color: "#ff3b3b",
              borderRadius: 3,
              border: "1px solid #ff3b3b",
              "&:hover": {
                background: "rgba(255,59,59,0.08)",
              },
              minWidth: 0,
            }}
          >
            <DeleteOutline fontSize="small" />
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default PlaylistCardItem;

