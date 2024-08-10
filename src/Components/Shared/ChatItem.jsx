import { Box, Stack, Typography } from "@mui/material";
import React, { memo } from "react"; // Ensure memo is imported from React
import { Link } from "../BasicStyle.Components";
import Divider from "@mui/material/Divider";
import AvatarCard from "./AvatarCard";
import {motion} from "framer-motion";
const ChatItem = ({
  // avatar = [],
  name,
  _id,
  groupchat = false,
  samesender,
  isonline,
  newMessage,
  Messagealert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <Link
      sx={{
        padding: "0",
      }}
      to={`/chat/${_id}`}
      style={{ textDecoration: "none" }}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupchat)}
    >
      <motion.div
      initial={{opacity: 0, x:"-100%"}}
      whileInView={{opacity: 1 , x:0}}
      transition={{delay: index * 0.1}}
        style={{
          display: "flex",
          gap: "1rem",
          padding: "1.5rem",
          alignItems: "center",
          backgroundColor: samesender ? "#071952" : "#232D3F",
          // #EEF5FF
          color: samesender ? "#1D24CA" : "#FF9BD2",
          position: "relative",
        }}
      >
        <AvatarCard  />

        <Stack>
          <Typography color="#EEEEEE">{name}</Typography>

          {Messagealert && (
            <Typography color="#393E46">
              {Messagealert.count} New Message
            </Typography>
          )}
        </Stack>
 
        {isonline && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "green",
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
            }}
          />
        )}
      </motion.div>

      {/* <Divider component="li" sx={{ borderBottomWidth: 1, borderColor: "#15F5BA" }} /> */}
    </Link>
  );
};

export default memo(ChatItem);
