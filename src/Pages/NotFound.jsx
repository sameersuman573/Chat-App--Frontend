import { ErrorOutlineRounded } from "@mui/icons-material";
import { Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "100vh",
      }}
    >
      <div>
        <ErrorOutlineRounded sx={{
          fontSize: "10rem"
        }} />
        <Typography variant="h1">404 Not Found</Typography>
        <Link to="/home">Go Back to Home </Link>
      </div>
    </Container>
  );
}

export default NotFound;
