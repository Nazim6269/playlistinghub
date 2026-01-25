import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import {
  AddCircleOutline,
  Favorite,
  FolderCopy,
  History,
  PlaylistPlay,
  Search,
  Settings,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useStoreActions, useStoreState } from 'easy-peasy';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

import DashboardCard from '../Components/dashboard/DashboardCard';
import NoPLaylistsItem from '../Components/playlistCardItem/NoPLaylistsItem';
import PlaylistSkeleton from '../Components/playlistCardItem/PlaylistSkeleton';
import SortablePlaylistCard from '../Components/playlistCardItem/SortablePlaylistCard';
import PlaylistForm from '../Components/playlistForm/PlaylistForm';
import RecentActivityCard from '../Components/recentActivity/RecentActivityCard';

// ======component starts from here===========//
const Home = ({
  getPlaylistById,
  playlistArray,
  favoritesIds = [],
  removePlaylist,
  addToFavorites,
  removeFromFavorites,
  addToRecent,
}) => {
  const [search, setSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [tagDialogOpen, setTagDialogOpen] = useState(false);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [newProjectName, setNewProjectName] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeProject, setActiveProject] = useState('All');

  const {
    tags,
    playlistTags,
    projects,
    playlistOrder,
    recentPlaylists,
    data,
    isLoading,
  } = useStoreState((state) => state.playlists);
  const {
    addTag,
    removeTag,
    reorderPlaylists,
    reorderProjectPlaylists,
    createProject,
    deleteProject,
  } = useStoreActions((actions) => actions.playlists);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      if (activeProject === 'All') {
        // Global reordering
        // Start with current order or default order if none exists
        let items =
          playlistOrder.length > 0
            ? [...playlistOrder]
            : playlistArray.map((p) => p.playlistId);

        // Ensure both IDs are in the array (safety check)
        if (!items.includes(active.id)) items.push(active.id);
        if (!items.includes(over.id)) items.push(over.id);

        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
          reorderPlaylists(arrayMove(items, oldIndex, newIndex));
        }
      } else {
        // Project reordering
        const project = projects[activeProject];
        if (project) {
          const items = [...project.playlistIds];
          const oldIndex = items.indexOf(active.id);
          const newIndex = items.indexOf(over.id);

          if (oldIndex !== -1 && newIndex !== -1) {
            reorderProjectPlaylists({
              projectId: activeProject,
              newOrder: arrayMove(items, oldIndex, newIndex),
            });
          }
        }
      }
    }
  };

  const handleFavorite = (playlistId) => {
    if (favoritesIds.includes(playlistId)) {
      removeFromFavorites?.(playlistId);
    } else {
      addToFavorites?.(playlistId);
    }
  };

  const handleRemove = (playlistId) => {
    if (window.confirm('Are you sure you want to remove this playlist?')) {
      removePlaylist?.(playlistId);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      addTag(newTag.trim());
      setNewTag('');
    }
  };

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      createProject(newProjectName.trim());
      setNewProjectName('');
    }
  };

  const filteredPlaylists = useMemo(() => {
    let filtered = [...playlistArray];
    if (activeProject !== 'All') {
      const proj = projects[activeProject];
      if (proj)
        filtered = filtered.filter((p) =>
          proj.playlistIds.includes(p.playlistId)
        );
    }
    if (search.trim()) {
      const s = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.playlistTitle.toLowerCase().includes(s) ||
          p.channelTitle.toLowerCase().includes(s)
      );
    }
    if (activeCategory !== 'All') {
      filtered = filtered.filter((p) =>
        (playlistTags[p.playlistId] || []).includes(activeCategory)
      );
    }
    return filtered;
  }, [
    playlistArray,
    search,
    activeCategory,
    activeProject,
    playlistTags,
    projects,
  ]);

  const recentItems = useMemo(
    () => recentPlaylists.map((id) => data[id]).filter(Boolean),
    [recentPlaylists, data]
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        pt: 10,
        pb: 6,
        mt: 6,
      }}
    >
      <Container maxWidth="xl">
        {/* HERO SECTION */}
        <Card
          sx={{
            mb: 5,
            p: 4,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            borderRadius: 0,
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" fontWeight={900}>
                Control your Learning Path ⚡
              </Typography>
              <Typography sx={{ opacity: 0.9, mt: 1 }}>
                Organize playlists into Projects, reorder them as you like, and
                track your progress.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack
                direction="row"
                spacing={1}
                justifyContent="flex-end"
                flexWrap="wrap"
                gap={1}
              >
                <Button
                  variant="contained"
                  startIcon={<AddCircleOutline />}
                  onClick={() => setFormOpen(true)}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    borderRadius: 0,
                    fontWeight: 800,
                  }}
                >
                  Add Playlist
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<FolderCopy />}
                  onClick={() => setProjectDialogOpen(true)}
                  sx={{ color: 'white', borderColor: 'white', borderRadius: 0 }}
                >
                  Projects
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Settings />}
                  onClick={() => setTagDialogOpen(true)}
                  sx={{ color: 'white', borderColor: 'white', borderRadius: 0 }}
                >
                  Tags
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Card>

        {/* PROJECTS BAR */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ mb: 3, overflowX: 'auto', pb: 1 }}
        >
          <Chip
            label="All Playlists"
            onClick={() => setActiveProject('All')}
            color={activeProject === 'All' ? 'primary' : 'default'}
            variant={activeProject === 'All' ? 'filled' : 'outlined'}
            sx={{ borderRadius: 0, fontWeight: 700 }}
          />
          {Object.values(projects).map((proj) => (
            <Chip
              key={proj.id}
              label={proj.name}
              onClick={() => setActiveProject(proj.id)}
              onDelete={() => deleteProject(proj.id)}
              color={activeProject === proj.id ? 'primary' : 'default'}
              variant={activeProject === proj.id ? 'filled' : 'outlined'}
              sx={{ borderRadius: 0, fontWeight: 700 }}
            />
          ))}
        </Stack>

        {/* SEARCH & FILTER */}
        <Card
          sx={{
            mb: 5,
            p: 3,
            borderRadius: 0,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: 'none',
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={3}
            alignItems="center"
          >
            <TextField
              placeholder="Search in current view..."
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <Search sx={{ mr: 1, color: 'primary.main' }} />
                ),
              }}
              sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
            />
            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{ flexWrap: 'wrap', alignItems: 'center' }}
            >
              <Typography
                variant="body2"
                fontWeight={800}
                color="text.secondary"
              >
                TAGS:
              </Typography>
              <Chip
                label="All"
                onClick={() => setActiveCategory('All')}
                color={activeCategory === 'All' ? 'secondary' : 'default'}
                sx={{ borderRadius: 0 }}
              />
              {tags.map((cat) => (
                <Chip
                  key={cat}
                  label={cat}
                  onClick={() => setActiveCategory(cat)}
                  color={activeCategory === cat ? 'secondary' : 'default'}
                  sx={{ borderRadius: 0 }}
                />
              ))}
            </Stack>
          </Stack>
        </Card>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="Total Tracks"
              value={playlistArray.length}
              icon={<PlaylistPlay />}
              color="primary.main"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="Favorites"
              value={favoritesIds.length}
              icon={<Favorite />}
              color="error.main"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="Recents"
              value={recentPlaylists.length}
              icon={<History />}
              color="info.main"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="Projects"
              value={Object.keys(projects).length}
              icon={<FolderCopy />}
              color="secondary.main"
            />
          </Grid>
        </Grid>

        {/* PLAYLIST GRID WITH DRAG & DROP */}
        {isLoading ? (
          <Grid container spacing={3} sx={{ mt: 1, mb: 5 }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Grid key={i} item xs={12} sm={6} md={4}>
                <PlaylistSkeleton />
              </Grid>
            ))}
          </Grid>
        ) : filteredPlaylists.length > 0 ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={filteredPlaylists.map((p) => p.playlistId)}
              strategy={rectSortingStrategy}
            >
              <Grid container spacing={3} sx={{ mt: 1, mb: 5 }}>
                {filteredPlaylists.map((item) => (
                  <Grid key={item.playlistId} item xs={12} sm={6} md={4}>
                    <SortablePlaylistCard
                      playlistId={item.playlistId}
                      playlistThumb={item.playlistThumb}
                      playlistTitle={item.playlistTitle}
                      channelTitle={item.channelTitle}
                      onFavorite={() => handleFavorite(item.playlistId)}
                      onRemove={() => handleRemove(item.playlistId)}
                      onView={() => addToRecent?.(item.playlistId)}
                      isFavorite={favoritesIds.includes(item.playlistId)}
                    />
                  </Grid>
                ))}
              </Grid>
            </SortableContext>
          </DndContext>
        ) : (
          <Box sx={{ mt: 4 }}>
            <NoPLaylistsItem />
          </Box>
        )}

        {/* RECENT ACTIVITY */}
        {recentItems.length > 0 && (
          <Card
            sx={{
              p: 4,
              borderRadius: 0,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: 'none',
              mt: 4,
            }}
          >
            <Typography variant="h6" fontWeight={900} mb={3}>
              RECENT ACTIVITY
            </Typography>
            <Stack spacing={2} divider={<Divider />}>
              {recentItems.slice(0, 5).map((item, i) => (
                <RecentActivityCard key={i} title={item.playlistTitle} />
              ))}
            </Stack>
          </Card>
        )}

        {/* DIALOGS */}
        <PlaylistForm
          getPlaylistById={getPlaylistById}
          open={formOpen}
          handleClose={() => setFormOpen(false)}
        />

        {/* Project Dialog */}
        <Dialog
          open={projectDialogOpen}
          onClose={() => setProjectDialogOpen(false)}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle sx={{ fontWeight: 900 }}>
            Create Project Folder
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                placeholder="Project name (e.g. Frontend Mastery)"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={handleCreateProject}
                sx={{ borderRadius: 0 }}
              >
                Create Project
              </Button>
            </Stack>
          </DialogContent>
        </Dialog>

        {/* Tag Dialog */}
        <Dialog
          open={tagDialogOpen}
          onClose={() => setTagDialogOpen(false)}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle sx={{ fontWeight: 900 }}>Global Tags</DialogTitle>
          <DialogContent>
            <Stack direction="row" spacing={1} sx={{ mt: 1, mb: 2 }}>
              <TextField
                size="small"
                fullWidth
                placeholder="New tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={handleAddTag}
                sx={{ borderRadius: 0 }}
              >
                Add
              </Button>
            </Stack>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => removeTag(tag)}
                  sx={{ borderRadius: 0 }}
                />
              ))}
            </Stack>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
};

Home.propTypes = {
  playlistArray: PropTypes.array,
  favoritesIds: PropTypes.array,
};

export default Home;
