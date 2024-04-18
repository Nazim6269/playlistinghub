import { PlayCircleFilledOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const PlaylistCardItem = ({ playlistThumb, playlistTitle, channelTitle }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="194"
        image={playlistThumb.url}
        alt={playlistTitle}
      />
      <CardContent>
        <Typography variant="h6" color="text.primary">
          {playlistTitle}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          {channelTitle}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button>
          <PlayCircleFilledOutlined />
          Play
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlaylistCardItem;
