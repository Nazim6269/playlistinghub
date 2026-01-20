import {
  DeleteOutline,
  FavoriteBorderOutlined,
  Favorite,
  PlayCircleFilledOutlined,
  Add,
  FolderOpen,
  Folder,
} from "@mui/icons-material";
import { Box, Button, Stack, Typography, LinearProgress, Chip, Menu, MenuItem, Tooltip } from "@mui/material";
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
  const [tagAnchorEl, setTagAnchorEl] = useState(null);
  const [projectAnchorEl, setProjectAnchorEl] = useState(null);

  const { watchedVideos, playlistTags, tags, data, favoritesIds, projects } = useStoreState((state) => state.playlists);
  const { assignTagToPlaylist, removeTagFromPlaylist, toggleFavorite, addPlaylistToProject, removePlaylistFromProject } = useStoreActions((actions) => actions.playlists);

  const isFavorite = propIsFavorite !== undefined ? propIsFavorite : (favoritesIds || []).includes(playlistId);
  const onFavorite = propOnFavorite || (() => toggleFavorite(playlistId));

  const watchedCount = (watchedVideos[playlistId] || []).length;
  const totalCount = data[playlistId]?.playlistItems?.length || 0;
  const assignedTags = playlistTags[playlistId] || [];
  const assignedProjects = Object.values(projects).filter(p => p.playlistIds.includes(playlistId));

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
        transition: "0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: 'none',
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: (theme) => `0 12px 20px -10px ${theme.palette.grey[400]}`,
        },
      }}
    >
      <Box sx={{ position: "relative", height: 160 }}>
        <CardMedia
          component="img"
          image={playlistThumb.url}
          alt={playlistTitle}
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
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

      <CardContent sx={{ pb: 1, flexGrow: 1 }}>
        <Typography
          variant="subtitle1"
          fontWeight={900}
          sx={{ lineHeight: 1.2, mb: 1, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
        >
          {playlistTitle}
        </Typography>
        <Typography variant="caption" color="text.secondary" fontWeight={800} sx={{ display: 'block', mb: 1 }}>
          {channelTitle.toUpperCase()}
        </Typography>

        <Typography variant="caption" sx={{ fontWeight: 800, color: progress === 100 ? "success.main" : "primary.main" }}>
          {watchedCount}/{totalCount} VIDEOS WATCHED
        </Typography>

        {/* PROJECTS & TAGS */}
        <Stack spacing={1.5} sx={{ mt: 2 }}>
          {/* Projects */}
          <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
            {assignedProjects.map(proj => (
              <Chip
                key={proj.id}
                icon={<Folder sx={{ fontSize: "0.8rem !important" }} />}
                label={proj.name}
                size="small"
                onDelete={() => removePlaylistFromProject({ projectId: proj.id, playlistId })}
                color="primary"
                sx={{ fontSize: "0.6rem", height: 20, fontWeight: 800, borderRadius: 0 }}
              />
            ))}
            <Chip
              icon={<Add sx={{ fontSize: "0.8rem !important" }} />}
              label="PROJECT"
              size="small"
              onClick={(e) => setProjectAnchorEl(e.currentTarget)}
              variant="outlined"
              sx={{ fontSize: "0.6rem", height: 20, fontWeight: 800, borderRadius: 0, borderStyle: 'dashed' }}
            />
          </Stack>

          {/* Tags */}
          <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
            {assignedTags.map(tag => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                onDelete={() => removeTagFromPlaylist({ playlistId, tag })}
                variant="outlined"
                sx={{ fontSize: "0.6rem", height: 20, fontWeight: 800, borderRadius: 0 }}
              />
            ))}
            <Chip
              icon={<Add sx={{ fontSize: "0.8rem !important" }} />}
              label="TAG"
              size="small"
              onClick={(e) => setTagAnchorEl(e.currentTarget)}
              variant="outlined"
              sx={{ fontSize: "0.6rem", height: 20, fontWeight: 800, borderRadius: 0, borderStyle: 'dashed' }}
            />
          </Stack>
        </Stack>

        {/* Tag Menu */}
        <Menu anchorEl={tagAnchorEl} open={Boolean(tagAnchorEl)} onClose={() => setTagAnchorEl(null)}>
          {tags.filter(t => !assignedTags.includes(t)).map(tag => (
            <MenuItem key={tag} onClick={() => { assignTagToPlaylist({ playlistId, tag }); setTagAnchorEl(null); }} sx={{ fontSize: '0.8rem', fontWeight: 700 }}>{tag}</MenuItem>
          ))}
          {tags.filter(t => !assignedTags.includes(t)).length === 0 && <MenuItem disabled>No more tags</MenuItem>}
        </Menu>

        {/* Project Menu */}
        <Menu anchorEl={projectAnchorEl} open={Boolean(projectAnchorEl)} onClose={() => setProjectAnchorEl(null)}>
          {Object.values(projects).filter(p => !p.playlistIds.includes(playlistId)).map(proj => (
            <MenuItem key={proj.id} onClick={() => { addPlaylistToProject({ projectId: proj.id, playlistId }); setProjectAnchorEl(null); }} sx={{ fontSize: '0.8rem', fontWeight: 700 }}>{proj.name}</MenuItem>
          ))}
          {Object.values(projects).filter(p => !p.playlistIds.includes(playlistId)).length === 0 && <MenuItem disabled>Create a Project first</MenuItem>}
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
