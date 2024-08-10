import React, { useState, useEffect } from "react";
import AdminLayout from "../Components/Layout/AdminLayout";
import Table from "../Components/Shared/Table";
import { dashboarddata } from "../Constants/SampleData";
import { fileFormat, transformImage } from "../lib/features";
import AvatarCard from "../Components/Shared/AvatarCard";
import { Stack, Avatar, Box } from "@mui/material";
import RenderAttachment from "../Components/Shared/RenderAttachment";
import { useFetchData } from "6pp";
import { useErrors } from "../hooks/hook";
import { LoaderIcon } from "react-hot-toast";

const columns = [
  {
    field: "_id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "Attachments",
    headerName: "Attachments",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => {
      const { Attachments } = params.row;

      return Attachments?.length > 0 ? 
      Attachments.map((i) => {

        // Grab th url with the fileformat
            const url = i.url;
            const file = fileFormat(url);

            return (
              <Box>
                <a
                  href={url}
                  target="_blank"
                  download
                  style={{
                    color: "#D7BBF5",
                  }}
                >
                  {RenderAttachment(file, url)}
                </a>
              </Box>
            );
          })
        : "No attachments "
return <AvatarCard alt={params.row.name} src={params.row.avatar} />;
    },
  },
  {
    field: "message",
    headerName: "Content",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "sender",
    headerName: "Sent By",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => (
      <Stack justifyContent={"center"} alignContent={"center"} alignItems={"center"}>
        <Avatar alt={params.row.sender.fullname} src={params.row.sender.avatar} />
        <span>{params.row.sender.fullname}</span>
      </Stack>
    ),
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    width: 150,
  },
  // {
  //   field: "groupChat",
  //   headerName: "Group Chat",
  //   headerClassName: "table-header",
  //   width: 200,
  // },
];

const MessageManagament = () => {


  const {
    loading,
    data: stats,
    error,
  } = useFetchData(
    "http://localhost:8000/api/v1/Admin/GetallMessages",
    "dashboard-messages"
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
  if(data){
    setrows(
      data?.map((mess) => ({
        ...mess,
        id: mess._id, // Set the unique `id` property required by DataGrid
      }))
    )
  }
  }, [data])
  

  return (
    <AdminLayout>
     {loading ? <LoaderIcon/> : (
      <div>
      <Table
        heading={"All Messages"}
        columns={columns}
        rows={rows}
        rowHeight={200}
      />
      </div>
     )}
    </AdminLayout>
  );
};

export default MessageManagament;
