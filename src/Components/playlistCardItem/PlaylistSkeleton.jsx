import { Box, Card, CardContent, Skeleton, Stack, Grid } from "@mui/material";

const PlaylistSkeleton = () => {
    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                width: 280,
                m: 1,
                borderRadius: 0,
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: 'none',
            }}
        >
            {/* Thumbnail Skeleton */}
            <Skeleton variant="rectangular" height={160} width="100%" />

            <CardContent sx={{ pb: 1, flexGrow: 1 }}>
                {/* Title Skeleton */}
                <Skeleton variant="text" width="90%" height={24} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="60%" height={24} sx={{ mb: 2 }} />

                {/* Channel Skeleton */}
                <Skeleton variant="text" width="40%" height={16} sx={{ mb: 1 }} />

                {/* Progress Text Skeleton */}
                <Skeleton variant="text" width="50%" height={16} sx={{ mb: 2 }} />

                {/* Tags/Projects Skeleton */}
                <Stack direction="row" spacing={0.5} sx={{ mt: 1 }}>
                    <Skeleton variant="rectangular" width={60} height={20} />
                    <Skeleton variant="rectangular" width={60} height={20} />
                </Stack>
            </CardContent>

            <Box sx={{ p: 2, pt: 0 }}>
                {/* Actions Skeleton */}
                <Skeleton variant="rectangular" width="100%" height={36} sx={{ mb: 1 }} />
                <Stack direction="row" spacing={1}>
                    <Skeleton variant="rectangular" width="50%" height={32} />
                    <Skeleton variant="rectangular" width="50%" height={32} />
                </Stack>
            </Box>
        </Card>
    );
};

export default PlaylistSkeleton;
