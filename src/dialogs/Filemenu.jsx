import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from "@mui/material";
import React, { useRef } from "react";
import {
  AudioFileOutlined,
  FileCopyOutlined,
  Image,
  ImageAspectRatioOutlined,
  VideoCallOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileMenu, setUploadingLoader } from "../Redux/Reducer/misc";
import toast from "react-hot-toast";
import { useSendAttachmentsMutation } from "../Redux/api/api";
import { useParams } from "react-router-dom";

const Filemenu = ({ anchorE1 }) => {
  const dispatch = useDispatch();
  const { isFileMenu } = useSelector((state) => state.misc);

const { chatId} = useParams()

  const imageRef = useRef(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const fileRef = useRef(null);

  // This Programitically triggers click event on an HTMl input element for file
  const selectImage = () => imageRef.current.click();
  const selectAudio = () => audioRef.current.click();
  const selectVideo = () => videoRef.current.click();
  const selectFile = () => fileRef.current.click();

  const [sendAttachments] = useSendAttachmentsMutation();

  const closefilemenu = () => {
    dispatch(setIsFileMenu(false));
  }; 

  const filechangeHandler = async (e, key) => {
    const files = Array.from(e.target.files);

    if (files.length <= 0) return;

    if (files.length > 5)
      return toast.error("You can only upload 5 files at a time");

      console.log("No of files" , files.length);

    dispatch(setUploadingLoader(true));

    const toastId = toast.loading(`Sending ${key}`);
    closefilemenu();

    try {
      const myForm = new FormData();

       files.forEach((file) => myForm.append("Attachments", file)); // New method where all files are sent under "files" key

      const res = await sendAttachments({chatId , data:myForm});

      console.log("Respose 1", res);
      console.log("Respose 2", res.data);
      console.log("Respose 3", res.data.data.AttachmentUrl?.url);

      if (res.data || res.data.data.AttachmentUrl.url) {

        const newImageUrl = res.data.data.AttachmentUrl.url
        console.log("New Image Url", newImageUrl);

        toast.success(`${key} sent successfully`, { id: toastId });

        
      }
      else {
      toast.error("Failed to send file", { id: toastId });
      }
    } catch (error) {
      toast.error(error.message || "An error occured while sending Attachments ", { id: toastId });
    } finally {
      dispatch(setUploadingLoader(false));
    }
  }; 

  return (
    <Menu open={isFileMenu} anchorEl={anchorE1} onClose={closefilemenu}>
      <div
        style={{
          width: "10rem",
        }}
      >
        <MenuList>
          {/* IMAGE */}
          <MenuItem onClick={selectImage}>
            <Tooltip title="Image">
              <ImageAspectRatioOutlined />
            </Tooltip>

            <ListItemText style={{ marginLeft: "0.5rem" }}>
              {" "}
              Image{" "}
            </ListItemText>

            <input
              type="file"
              multiple
              accept="image/png, image/jpeg , image/gif"
              style={{
                display: "none",
              }}
              onChange={(e) => filechangeHandler(e, "Images")}
              ref={imageRef}
            />
          </MenuItem>

          {/* AUDIO */}
          <MenuItem onClick={selectAudio}>
            <Tooltip title="Audio">
              <AudioFileOutlined />
            </Tooltip>

            <ListItemText style={{ marginLeft: "0.5rem" }}>
              {" "}
              Audio{" "}
            </ListItemText>

            <input
              type="file"
              multiple
              accept="audio/mpeg, audio/wav"
              style={{
                display: "none",
              }}
              onChange={(e) => filechangeHandler(e, "Audios")}
              ref={audioRef}
            />
          </MenuItem>

          {/* VIDEO */}
          <MenuItem onClick={selectVideo}>
            <Tooltip title="Video">
              <VideoCallOutlined />
            </Tooltip>

            <ListItemText style={{ marginLeft: "0.5rem" }}>
              {" "}
              Video{" "}
            </ListItemText>

            <input
              type="file"
              multiple
              accept="video/mp4, video/webm, video/ogg"
              style={{
                display: "none",
              }}
              onChange={(e) => filechangeHandler(e, "Videos")}
              ref={videoRef}
            />
          </MenuItem>

          {/* FILE */}
          <MenuItem onClick={selectFile}>
            <Tooltip title="File">
              <FileCopyOutlined />
            </Tooltip>

            <ListItemText style={{ marginLeft: "0.5rem" }}> File </ListItemText>

            <input
              type="file"
              multiple
              accept="*"
              style={{
                display: "none",
              }}
              onChange={(e) => filechangeHandler(e, "Files")}
              ref={fileRef}
            />
          </MenuItem>
        </MenuList>
      </div>
    </Menu>
  );
};

export default Filemenu;
