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
        boxShadow: 0,
        background: "#d5e5e5",
        borderRadius: 2,
      }}
    >
      <Typography>{title}</Typography>
      <Button size="small" sx={{ color: "#11998e", fontWeight: 600 }}>
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
