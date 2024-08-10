import { Avatar, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import {
  Face as FaceIcon,
  AlternateEmail as UsernameIcon,
  CalendarMonth as CalenderIcon,
} from "@mui/icons-material";
import moment from "moment";
import React from "react";
import { transformImage } from "../../lib/features";

const Profile = ({ user }) => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        src={transformImage(user?.avatar)}
        sx={{
          height: 150,
          width: 150,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid #159895 ",
        }}
      />
      <ProfileCard heading={"TiTle"} text={user.fullname} />
      <ProfileCard
        heading={"Username"}
        text={user?.username}
        Icon={<UsernameIcon />}
      />
      <ProfileCard heading={"Email"} text={user?.email} Icon={<FaceIcon />} />
      <ProfileCard
        heading={"Joined"}
        text={moment("2024-07-23T00:00:00.000Z").fromNow()}
        Icon={<CalenderIcon />}
      />
    </Stack>
  );
};

const ProfileCard = ({ text, heading, Icon }) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    color={"white"}
    textAlign={"center"}
  >
    {Icon && Icon}

    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography color="#159895" variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
