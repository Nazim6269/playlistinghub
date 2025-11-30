import { Box, Card, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

const DashboardCard = ({ title, value, icon, color }) => {
  return (
    <Card
      sx={{
        p: 3,
        height: "100%",
        borderRadius: 3,
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Stack spacing={2} alignItems="flex-start">
        <Box
          sx={{
            background: color,
            color: "#fff",
            p: 1.5,
            borderRadius: "50%",
          }}
        >
          {icon}
        </Box>

        <Typography variant="h6">{title}</Typography>
        <Typography fontWeight="bold" fontSize="28px">
          {value}
        </Typography>
      </Stack>
    </Card>
  );
};

//defining props
DashboardCard.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
};

export default DashboardCard;
