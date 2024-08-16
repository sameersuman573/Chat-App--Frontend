import { Avatar, IconButton, ListItem, Typography, Stack } from "@mui/material";
import React from "react";
import { Add as AddIcon , Remove } from "@mui/icons-material";
import { transformImage } from "../../lib/features";
import Loader from "../Layout/Loaders";


// Used for Search Item in Search Component and in Groups also
// Data is not provided here it it provided by the parent component
const UserItem = ({
  user,
  handler,
  handlerIsLoading,
  isAdded = false,
  styling = {},
}) => {
  const { username, _id, avatar, email } = user;

 
  return ( 
    <ListItem
      sx={{
        bgcolor: "#F0F3FF",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={2}
        width={"100%"}
        {...styling}
      >
        <Avatar src={transformImage(avatar)} />

        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 1,
            color: "#3BACB6",
          }}
        >
          {user.username}{" "}
        </Typography>

        <IconButton
          sx={{
            bgcolor: "#EE7214",
            color: "#141E46",
            "&:hover": {
              bgcolor: "#06D001",
            },
          }}
          onClick={() => handler(_id)}
          // Pass the Id of the fetched User
          disabled={handlerIsLoading}
        >
        {isAdded ? <Remove /> : <AddIcon />
 }
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default UserItem;
