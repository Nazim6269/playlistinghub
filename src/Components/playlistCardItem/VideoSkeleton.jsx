import { Box, Card, CardContent, Skeleton, Stack } from "@mui/material";

const VideoSkeleton = () => {
    return (
        <Box
            sx={{
                borderRadius: 0,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                height: "100%",
            }}
        >
            {/* Thumbnail Skeleton */}
            <Skeleton variant="rectangular" height={160} width="100%" />

            <Box sx={{ p: 2 }}>
                {/* Title Skeleton */}
                <Skeleton variant="text" width="90%" height={20} />
                <Skeleton variant="text" width="70%" height={20} sx={{ mb: 1 }} />

                {/* Channel Skeleton */}
                <Skeleton variant="text" width="40%" height={16} />
            </Box>
        </Box>
    );
};

export const VideoHeaderSkeleton = () => {
    return (
        <Box
            sx={{
                mb: 5,
                p: { xs: 3, md: 4 },
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 4,
                borderRadius: 0,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                alignItems: "center",
            }}
        >
            {/* Thumbnail Skeleton */}
            <Skeleton variant="rectangular" width={280} height={180} sx={{ flexShrink: 0 }} />

            {/* Info Skeleton */}
            <Box sx={{ flexGrow: 1, width: '100%' }}>
                <Skeleton variant="text" width="60%" height={40} />
                <Skeleton variant="text" width="80%" height={24} />
                <Skeleton variant="text" width="70%" height={24} />
                <Skeleton variant="text" width="40%" height={24} sx={{ mt: 2 }} />
            </Box>
        </Box>
    )
}

export default VideoSkeleton;
