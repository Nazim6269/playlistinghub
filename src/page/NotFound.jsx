import { Container, Typography } from "@mui/material";
import React from "react";

const NotFound = () => {
  return (
    <Container maxWidth={"lg"} sx={{ my: 16 }}>
      <Typography variant="h2" align={"center"}>
        404 Not Found
      </Typography>
    </Container>
  );
};

export default NotFound;
