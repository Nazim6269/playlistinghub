import { Box, Card, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

const DashboardCard = ({ title, value, icon, color }) => {
  return (
    <Card
      sx={{
        p: 3,
        height: "100%",
        borderRadius: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        transition: "0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: (theme) => `0 12px 24px -10px ${theme.palette.grey[400]}`,
        },
      }}
    >
      <Stack direction="row" spacing={3} alignItems="center">
        <Box
          sx={{
            bgcolor: `${color}15`, // Light themed background
            color: color,
            p: 2,
            borderRadius: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {icon}
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {title}
          </Typography>
          <Typography fontWeight={800} variant="h4" sx={{ mt: 0.5 }}>
            {value}
          </Typography>
        </Box>
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
