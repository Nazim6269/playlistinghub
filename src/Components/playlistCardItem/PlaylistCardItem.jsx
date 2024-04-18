import { PlayCircleFilledOutlined } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const PlaylistCardItem = ({
  playlistThumb,
  playlistTitle,
  channelTitle,
  playlistId,
}) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        margin: 1,
      }}
    >
      <CardMedia
        component="img"
        height="194"
        image={playlistThumb.url}
        alt={playlistTitle}
      />
      <CardContent>
        <Typography variant="h6" color="text.primary">
          {`${
            playlistTitle.length > 0
              ? playlistTitle.substr(0, 40) + "..."
              : playlistTitle
          }`}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          {channelTitle}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }}></Box>
      <CardActions disableSpacing>
        <Button to={`/player/${playlistId}`} component={Link}>
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <PlayCircleFilledOutlined />
            <Typography variant="body2" fontWeight={600}>
              Start Tutorial
            </Typography>
          </Stack>
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlaylistCardItem;
