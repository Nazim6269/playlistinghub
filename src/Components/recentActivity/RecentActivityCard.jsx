import { Button, Card, Typography } from "@mui/material";
import PropTypes from "prop-types";

const RecentActivityCard = ({ title }) => {
  return (
    <Card
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "none",
        bgcolor: "grey.50",
        borderRadius: 0,
        border: "1px solid",

        borderColor: "divider",
        "&:hover": {
          bgcolor: "white",
          borderColor: "primary.light"
        }
      }}
    >
      <Typography variant="body2" fontWeight={600} color="text.primary">{title}</Typography>
      <Button
        size="small"
        variant="text"
        sx={{
          color: "primary.main",
          fontWeight: 800,
          "&:hover": { bgcolor: "primary.lighter" }
        }}
      >
        Open
      </Button>
    </Card>
  );
};


//defining proptypes
RecentActivityCard.propTypes = {
  title: PropTypes.string,
};

export default RecentActivityCard;
