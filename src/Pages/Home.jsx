import React from "react";
import AppLayout from "../Components/Layout/AppLayout";
import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box bgcolor={"gray"} height={"100%"}>
      <Typography p={"2rem"} variant="h5" textAlign={"center"}>
      𝑺𝒕𝒂𝒓𝒕 𝑪𝒉𝒂𝒕𝒕𝒊𝒏𝒈 𝒘𝒊𝒕𝒉 𝒚𝒐𝒖𝒓 𝒔𝒐𝒖𝒍𝒎𝒂𝒕𝒆          </Typography>
    </Box>
  );
};

// It contains the wrapped componenet
export default AppLayout()(Home);
