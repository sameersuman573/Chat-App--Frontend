
import { Box, Typography } from "@mui/material";
import moment from "moment";
import React, { memo } from "react";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";
import { useSelector } from "react-redux";
import {motion} from "framer-motion"

const MessageComponent = ( messages, createdAt ) => {

  const {user} = useSelector((state) => state.auth);

  const { sender, message, attachments = [] } = messages;
  const sameSender = sender?._id === user._id;
// The logic is that userId will same always which is me . Now if the sender is me then the message will be on the right side of the screen else it will be on the left side of the screen.
  const Timeout = moment(createdAt).fromNow();


  return ( 
    <motion.div
    initial={{opacity: 0 , x:"-100%"}}
    whileInView={{opacity: 1 , x:0}}
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: "#151515",
        color: "#F8F6F4",
        borderRadius: "20px",
        padding: "1.5rem",
        width: "fit-content",
        borderColor: "#005B41",
      }} 
    >
      {/* Sender Name Component */}
      {!sameSender && (
        <Typography color={"#E76161"} variant="body2">
          {sender?.fullname}
        </Typography>
      )}

      {/* Message Component */}
      {message && (
        <Typography color={"#FFF7FC"} variant="body3">
          {message}
        </Typography>
      )}

      {/* Attachments */}
      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
           const file = fileFormat(url);
 
          return (
            <Box key={index}>
              <a
                href={url}
                target="_blank"
                download
                style={{
                  color: "black",
                  padding: "rem",
                }}
              >
                 {RenderAttachment(file, url)}
              </a>
            </Box>
          );
        })}

      <Typography color={"#FFF455"} variant="body2">{Timeout} </Typography>
    </motion.div>
  );
};

export default memo(MessageComponent);
