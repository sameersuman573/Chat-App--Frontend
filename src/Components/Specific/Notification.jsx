import {
  Dialog,
  DialogTitle,
  Stack,
  Typography,
  ListItem,
  List,
  Avatar,
  Button,
} from "@mui/material";
import React, { memo, useState } from "react";
import toast from "react-hot-toast";
import { SampleNotif } from "../../Constants/SampleData";
import {
  useGetNotificationQuery,
  useAcceptFriendRequestMutation,
} from "../../Redux/api/api";
import { useErrors } from "../../hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotification } from "../../Redux/Reducer/misc";

const Notification = () => {
  const dispatch = useDispatch();

  // const {isNotification} = useSelector((state) => state.misc)
  const { isNotification } = useSelector((state) => state.misc);

  const { isLoading, data, error, isError } = useGetNotificationQuery();

  // console.log("Notification", data);
  // console.log(data.data[0]._id); 
 

  if (data && data.data && data.data.length > 0) {
    console.log(data.data[0]._id);
  }

  useErrors([{ isError, error }]);

  const [acceptRequest] = useAcceptFriendRequestMutation()

  const FriendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false))
    try {
      const res = await acceptRequest({ notifId: _id });

      if (res.data?.success) {
        console.log("use socket");
        toast.success(res.data.message);
      } else {
        toast.error(res.data?.error || "Failed to accept request");
      }
    } catch (error) {
      toast.error("Failed to accept request from catch block");
      console.error("Failed to accept request from catch block", error);
    }
  };

  const onCloseHanlder = () => dispatch(setIsNotification(false));

  return (
    <Dialog open={isNotification} onClose={onCloseHanlder}>
      <Stack
        direction="column"
        maxWidth={"40rem"}
        p={{ xs: "1rem", sm: "2rem" }}
        spacing={"2rem"}
      >
        <DialogTitle>Notification</DialogTitle>

        {isLoading ? (
          "Loading"
        ) : (
          <>
            {data.data.length > 0 ? (
              <>
                {data.data.map(({ sender, _id }) => (
                  <NotificationItems
                    sender={sender}
                    _id={_id}
                    handler={FriendRequestHandler}
                    key={_id}
                  />
                ))}
              </>
            ) : (
              <Typography textAlign={"center"}> 0 Notification </Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItems = memo(({ sender, _id, handler }) => {
  const { username, avatar } = sender;

  return (
    <ListItem>
      <Stack direction={"row"} alignItems={"center"} spacing={2} width={"100%"}>
        <Avatar src={avatar} />

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
          {`${username} sent you a friend request`}
        </Typography>

        {/* button to accept and reject request */}
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button onClick={() => handler({ _id, accept: true })}>
            {" "}
            Accept{" "}
          </Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            {" "}
            Reject{" "}
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notification;
