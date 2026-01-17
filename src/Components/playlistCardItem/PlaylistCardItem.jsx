import {
  DeleteOutline,
  FavoriteBorderOutlined,
  Favorite,
  PlayCircleFilledOutlined,
} from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";

const PlaylistCardItem = ({
  playlistThumb,
  playlistTitle,
  channelTitle,
  playlistId,
  onRemove, // function to remove playlist
  onFavorite, // function to add favorite
  isFavorite = false, // whether playlist is favorited
}) => {
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
      </CardContent>

      <Box sx={{ flexGrow: 1 }} />

      {/* Actions */}
      <CardActions
        disableSpacing
        sx={{
          px: 2,
          pb: 2,
          display: "flex",
          justifyContent: "space-between",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        {/* Start Tutorial */}
        <Button
          to={`/player/${playlistId}`}
          component={Link}
          sx={{
            flexGrow: 1,
            textTransform: "none",
            fontWeight: 600,
            color: "#11998e",
            borderRadius: 3,
            border: "1px solid #11998e",
            "&:hover": {
              background: "rgba(17,153,142,0.08)",
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

        {/* Favorite */}
        <Button
          onClick={onFavorite}
          sx={{
            flexGrow: 1,
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
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            justifyContent="center"
          >
            {isFavorite ? <Favorite /> : <FavoriteBorderOutlined />}
            <Typography variant="body2" fontWeight={600}>
              {isFavorite ? "Favorited" : "Add To Favorite"}
            </Typography>
          </Stack>
        </Button>

        {/* Remove */}
        <Button
          onClick={onRemove}
          sx={{
            flexGrow: 1,
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
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            justifyContent="center"
          >
            <DeleteOutline />
            <Typography variant="body2" fontWeight={600}>
              Remove
            </Typography>
          </Stack>
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlaylistCardItem;
