import React from "react";
import AppLayout from "../Components/Layout/AppLayout";
import { Box, Typography } from "@mui/material";
  const Home = () => {
  return (
    <Box bgcolor={"gray"} height={"100%"}>
    
      <Typography p={"2rem"} variant="h5" textAlign={"center"}>
      Ｈｅｙ , Ｗｈａｔｓ'ｕｐ      </Typography>
    </Box>
  );
};
 // It contains the wrapped componenet
export default AppLayout()(Home);
