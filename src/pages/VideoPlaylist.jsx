import { CardMedia, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import PlaylistSingleVideo from "../Components/playlistSingleVideo/PlaylistSingleVideo";

const VideoPlaylist = ({ playlists }) => {
  const { playlistId } = useParams();
  const current = playlists[playlistId];
  // const playlist = useStoreActions((actions) => actions.playlists);

  // useEffect(() => {
  //   playlist.getPlaylistData(playlistId);
  // }, []);

  if (!current) return;

  return (
    <Container maxWidth={"lg"} sx={{ my: 16 }}>
      <CardMedia
        component={"img"}
        image={current.playlistThumb.url}
        sx={{ height: 200, width: 440 }}
      />
      <Typography variant="h4">{current.playlistTitle}</Typography>
      <Typography>{current.playlistDesc}</Typography>

      {current.playlistItems.map((item) => {
        const { title, thumbnail } = item;

        return (
          <div key={item.contentDetails.videoId}>
            <PlaylistSingleVideo
              key={item.contentDetails.videoId}
              url={thumbnail.url}
              title={title}
              channelTitle={current.channelTitle}
              videoId={item.contentDetails.videoId}
            />
          </div>
        );
      })}
    </Container>
  );
};

export default VideoPlaylist;
