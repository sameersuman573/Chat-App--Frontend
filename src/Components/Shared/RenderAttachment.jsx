
import React from "react";
import { transformImage } from "../../lib/features";
import { FileOpen } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const RenderAttachment = (file, url) => {
  switch (file) {
    // CASE OF VIDEO
    case "video":
      return <video src={url} preload="none" width={"200px"} controls 
      />;

    //  CASE OF IMAGE
    case "image":
      return (
        <img
          src={transformImage(url, 200)}
          alt="Attachment"
          width={"200px"}
          height={"150px"}
          style={{
            objectFit: "contain",
          }}
        />
      );

    // CASE OF AUDIO
    case "audio":
      return <audio src={url} preload="none" controls />;


    //  DEFAULT ANY FILE TYPE
    default:
       return (
        <IconButton
          component="a" 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          title="Open File"
         >
      <FileOpen sx={{
        color: "#F5004F"
      }} />;
        </IconButton>
      )
  }
};

export default RenderAttachment;
