import React from "react";
import AdminLayout from "../Components/Layout/AdminLayout";
import {
  Box,
  Container,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  AdminPanelSettings,
  Group,
  GroupOutlined,
  MessageRounded,
  NotificationAddRounded,
  Person,
  Person3,
  Widgets,
} from "@mui/icons-material";
import moment from "moment";
import {useFetchData} from "6pp"
import { CurveButton, SearchField } from "../Components/BasicStyle.Components";
import { DoughtnutChart, LineChart } from "../Components/Specific/Charts";
import { LoaderIcon } from "react-hot-toast";
import {useErrors} from "../hooks/hook"
import { Server } from "../Constants/Config";


 const Dashboard = () => {


  const {loading , data:stats , error} = useFetchData(
    `${Server}/api/v1/Admin/GetStats` , "dashboard-stats"
  );


  const {data } = stats || {};

  useErrors([{
    isError: error,
    error: useErrors
  }])


  // Appbar
  const Appbar = () => (
    
    <Paper
      elevation={19}
      sx={{
        padding: "1rem",
        margin: "2rem 0",
        borderRadius: "5rem",
        backgroundColor: "#f5f5f5",
      }}
    >
    
    </Paper>
  );

  // Widgets
  const Widgets = (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      justifyContent={"space-between"}
      alignItems={"center"}
      margin={"2rem 0"}
    >
      <Widget title={"Users"} value={data?.UsersCount} Icon={<Person3 />} />
      <Widget title={"chats"} value={data?.GroupsCount} Icon={<GroupOutlined />} />
      <Widget title={"Messages"} value={data?.MessagesCount} Icon={<MessageRounded />} />
    </Stack>
  );


  console.log(data);
  return loading ? <LoaderIcon/> : (
    <AdminLayout>
      <Container component={"main"}>
        {/* Render the Appbar component */}
        <Appbar />

        <Stack
          direction={{
            xs: "column",
            lg: "row",
          }}
          flexWrap={"wrap"}
          justifyContent={"center"}
          alignItems={{
            xs: "center",
            lg: "stretch",
          }}
          sx={{
            gap: "2rem",
          }}
        >
          {/* Line Chart */}
          <Paper
            elevation={3}
            sx={{
              padding: "2rem 3.5rem",
              borderRadius: "5rem",
              width: "100%",
              maxWidth: "50rem",
              height: "25rem",
              alignItems: "center",
            }}
          >
            <Typography>Last Message</Typography>

            <LineChart value={data?.messagesChart || []} />
          </Paper> 

          {/* Dougnut Chart */}
          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              borderRadius: "3rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100%", sm: "50%" },
              position: "relative",
              width: "100%",
              maxWidth: "35rem",
              height: "15rem",
            }}
          >
            <DoughtnutChart
              labels={["single Chat", "Group Chat"]}
              value={[data?.TotalChatsCount - data?.GroupsCount || 0, data?.GroupsCount || 0]}
            />

            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignContent={"center"}
              spacing={"0.5rem"}
              width={"100%"}
              height={"100%"}
            >
              <Group />
              <Typography>Vs</Typography>
              <Person />
            </Stack>
          </Paper>
        </Stack>

        {Widgets}
      </Container>
    </AdminLayout>
  );
};

const Widget = ({ title, value, Icon }) => (
  <Paper
    sx={{
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "1rem",
      width: "20rem",
    }}
  >
    <Stack alignItems={"center"} spacing={"4rem"}>
      <Typography
        sx={{
          color: "#088395",
          borderRadius: "50%",
          border: "5px solid rgba(0,0,0,0.9)",
          width: "8rem",
          height: "8rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {value}
        <Stack direction={"row"} alignItems={"center"} spacing={"center"}>
          {Icon}
          <Typography>{title}</Typography>
        </Stack>
      </Typography>
    </Stack>
  </Paper>
);

export default Dashboard;
