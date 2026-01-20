import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, IconButton } from '@mui/material';
import { DragIndicator } from '@mui/icons-material';
import PlaylistCardItem from './PlaylistCardItem';

const SortablePlaylistCard = (props) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: props.playlistId });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
        position: 'relative',
        height: '100%',
    };

    return (
        <Box
            ref={setNodeRef}
            style={style}
            sx={{
                '&:hover .drag-handle': { opacity: 1 },
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box
                className="drag-handle"
                {...attributes}
                {...listeners}
                sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    zIndex: 10,
                    bgcolor: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(4px)',
                    color: 'primary.main',
                    borderRadius: 0,
                    opacity: { xs: 1, md: 0.6 },
                    transition: 'all 0.2s',
                    cursor: 'grab',
                    '&:hover': { opacity: 1, bgcolor: 'primary.main', color: 'white' },
                    '&:active': { cursor: 'grabbing' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderLeft: '1px solid',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <DragIndicator />
            </Box>

            <PlaylistCardItem {...props} />
        </Box>
    );
};

export default SortablePlaylistCard;
