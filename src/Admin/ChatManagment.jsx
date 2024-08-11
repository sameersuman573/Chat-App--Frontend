import React, { useState, useEffect } from "react";
import AdminLayout from "../Components/Layout/AdminLayout";
import { Avatar, Stack, Typography } from "@mui/material";
import Table from "../Components/Shared/Table";
import { dashboarddata } from "../Constants/SampleData";
import { transformImage } from "../lib/features";
import AvatarCard from "../Components/Shared/AvatarCard";
import { useFetchData } from "6pp";
import { useErrors } from "../hooks/hook";
import { LoaderIcon } from "react-hot-toast";
import { Server } from "../Constants/Config";

const columns = [
  {
    field: "_id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => {
      return <AvatarCard src={params.row.avatar} />
    }
  },
  
  {
    field: "members",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 200,
  },

  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200,
  },
   
  {
    field: "message",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "admin",
    headerName: "Admin ",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => (
      <Stack direction="row" alignItems="center" spacing={"1rem"}>
        <Avatar alt={params.row.admin.fullname} src={params.row.admin.avatar} />
        <span>{params.row.admin.fullname} </span>
      </Stack>
    ),
  },
];

const ChatManagment = () => {
  const {
    loading,
    data: stats,
    error,
  } = useFetchData(
    `${Server}/api/v1/Admin/GetallChats`,
    "dashboard-chats"
  );

  const { data } = stats || {};

  // console.log(data);

  useErrors([
    {
      isError: error,
      error: useErrors,
    },
  ]);

  const [rows, setrows] = useState([]);
  
  useEffect(() => {
    if (data) {
      setrows(
        data.map((chat) => ({
          ...chat,
          // Populate the data
          id: chat._id, // Set the unique `id` property required by DataGrid
        }))
      );
    }
  }, [data]);

  return (
    <AdminLayout>
      {loading ? (
        <LoaderIcon />
      ) : (
        <div>
          <Table heading={"All Chats"} columns={columns} rows={rows} />
          <Typography>Hey i am here</Typography>
        </div>
      )}
    </AdminLayout>
  );
};

export default ChatManagment;
