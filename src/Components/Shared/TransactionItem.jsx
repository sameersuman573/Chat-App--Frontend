import { Avatar, IconButton, ListItem, Typography, Stack } from "@mui/material";
import React from "react";
import { Add as AddIcon , MoneyRounded, MoneySharp, Remove } from "@mui/icons-material";
import { transformImage } from "../../lib/features";
import Loader from "../Layout/Loaders";
import { useNavigate } from "react-router-dom";


// Used for Search Item in Search Component and in Groups also
// Data is not provided here it it provided by the parent component
const TransactionUserItem = ({
  user,
  handler,
  handlerIsLoading,
  isAdded = false,
  styling = {},
}) => {
  const { username, _id, avatar, email } = user;
  console.log("User Item checking", user.fullname);

  const navigate = useNavigate();


  const handleNavigation = () => {
    if (!user._id || !user.username || !user.fullname) {
        console.error("User object is missing properties", user);
        return;
    }

    navigate(`/send?id=${user._id}&username=${user.username}&fullname=${user.fullname}`);
};


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
        // onClick={handleNavigation}
           disabled={handlerIsLoading}
        >
        {isAdded ? <MoneyRounded /> : <MoneySharp />
 }
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default TransactionUserItem;
