import React, { useState, useEffect } from "react";
import AdminLayout from "../Components/Layout/AdminLayout";
import { Avatar, Typography } from "@mui/material";
import Table from "../Components/Shared/Table";
import { dashboarddata } from "../Constants/SampleData";
import { transformImage } from "../lib/features";
import { useFetchData } from "6pp";
import { useErrors } from "../hooks/hook";
import { LoaderIcon } from "react-hot-toast";
import { Server } from "../Constants/Config";

const columns = [
  {
    field: "id",
    //  map with data feild name
    headerName: "ID",
    // map with the headers of table section
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avatar} />
    ),
  },
  {
    field: "fullname",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Joined On",
    headerClassName: "table-header",
    width: 200,
  },
];

const UserManagement = () => {
  const {
    loading,
    data: stats,
    error,
  } = useFetchData(
    `${Server}/api/v1/Admin/GetallUsers`,
    "dashboard-users"
  );

  const { data } = stats || {};

  console.log(data);

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
        data.map((i) => ({
          id: i._id,
          ...i,
          avatar: transformImage(i.avatar, 50),
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
          <Table heading={"All users"} columns={columns} rows={rows} />
          <Typography>jai siya ram</Typography>
        </div>
      )}
    </AdminLayout>
  );
};

export default UserManagement;
