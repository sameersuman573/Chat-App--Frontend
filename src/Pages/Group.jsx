import React, { useState, memo, useEffect, lazy, Suspense } from "react";
import AppLayout from "../Components/Layout/AppLayout";
import {
  Backdrop,
  Box,
  Button,
  ButtonGroup,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ArrowBack, Done, Edit, Menu, Send } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Link } from "../Components/BasicStyle.Components";
import AvatarCard from "../Components/Shared/AvatarCard";
import UserItem from "../Components/Shared/UserItem";
import AddmemberDialog from "../dialogs/AddmemberDialog";
import {
  useMyGroupsQuery,
  useChatDetailsQuery,
  useRenameGroupMutation,
  useRemoveGroupMemberMutation,
  useAddGroupMemberMutation,
  useDeleteChatMutation,
} from "../Redux/api/api";
import { useAsycMutation, useErrors } from "../hooks/hook";
import Loader from "../Components/Layout/Loaders";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../Redux/Reducer/misc";
const ConfirmDeleteDialog = lazy(() =>
  import("../dialogs/ConfirmDeleteDialog")
);

const Group = () => {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAddMember } = useSelector((state) => state.misc);

  const myGroups = useMyGroupsQuery("");
  // console.log("My group chat detials show karo", myGroups?.data?.data);

  const groupDetails = useChatDetailsQuery(chatId, {
    skip: !chatId,
  });

  const [updateGroup, isLoadingGroupName] = useAsycMutation(
    useRenameGroupMutation
  );

  const [removeGroupMember, isLoadingRemoveMember] = useAsycMutation(
    useRemoveGroupMemberMutation
  );

  const [addGroupMember, isLoadingAddMember] = useAsycMutation(
    useAddGroupMemberMutation
  );

  const [deleteChat, isLoadingdeleteChat] = useAsycMutation(
    useDeleteChatMutation
  );

  console.log("Group Details", groupDetails.data?.data);

  // const mappingGroupchat = myGroups?.data?.data.map((p) => p.name);
  //  console.log("Group chat mapping", mappingGroupchat);

  const navigateBack = () => {
    navigate("/home");
  };

  const theme = useTheme();
  const isXscreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [isMobileOpen, setisMobileOpen] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [groupname, setgroupname] = useState("");
  const [groupNameUpdatedValue, setgroupNameUpdatedValue] = useState("");
  const [confirmDeleteDialog, setconfirmDeleteDialog] = useState(false);

  useErrors[
    ({
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    })
  ];

  useEffect(
    () => {
      if (groupDetails.data?.data) {
        setgroupname(groupDetails.data?.data?.name);
        setgroupNameUpdatedValue(groupDetails.data?.data?.name);
      }

      return () => {
        setgroupname("");
        setgroupNameUpdatedValue("");
        setisEdit(false);
        // while i was changing name if i change the group then it will not show the previous name and will not update it
      };
    },
    [
      // groupDetails.data?.data
    ]
  );

  const handleMobile = () => {
    setisMobileOpen((prev) => !prev);
  };

  const handleMobileclose = () => {
    setisMobileOpen(false);
  };

  const updateGroupName = () => {
    setisEdit(false);
    updateGroup("Group name updated", { chatId, name: groupNameUpdatedValue });
    console.log("Group name updated");
    console.log(groupNameUpdatedValue);
  };

  const confirmDeleteHandler = () => {
    console.log("Delete Sure");
    setconfirmDeleteDialog(true);
  };

  const closeConfirmDelteHandler = () => {
    console.log("Close Confirm Delete");
    setconfirmDeleteDialog(false);
  };

  const Opentoaddmember = () => {
    dispatch(setIsAddMember(true));
    console.log("open to add memeber");
  };

  const removeMemberHandler = (memberId) => {
    removeGroupMember("Member Removed Successfully", { chatId, memberId });
    console.log("Remove Member");
  };

  const deleteHanlder = () => {
    deleteChat("Group Delted ", chatId);
    console.log("Delete Group");
    navigate("/home");
    closeConfirmDelteHandler();
  };

  // Just Contains Icons
  const IconButtons = (
    <>
      <Box>
        <IconButton
          sx={{
            display: {
              xs: "blcok",
              sm: "none",
              position: "absolute",
              right: "1rem",
              top: "1rem",
            },
          }}
          onClick={handleMobile}
        >
          <Menu />
        </IconButton>
      </Box>

      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: "#14C38E",
            color: "#FFFFFF",
            ":hover": {
              bgcolor: "#7D8ABC",
            },
          }}
          onClick={navigateBack}
        >
          <ArrowBack />
        </IconButton>
      </Tooltip>
    </>
  );

  // To update the group Name
  const Groupname = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={"1rem"}
      padding={"3rem"}
    >
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdatedValue}
            onChange={(e) => setgroupNameUpdatedValue(e.target.value)}
          />

          <IconButton onClick={updateGroupName} disabled={isLoadingGroupName}>
            <Done color="#37B7C3" />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4"> {groupname} </Typography>
          <IconButton
            onClick={() => setisEdit(true)}
            disabled={isLoadingGroupName}
          >
            <Edit />
          </IconButton>
        </>
      )}
    </Stack>
  );

  // data fetching from Backend and updating the value
  useEffect(() => {
    if (chatId) {
      setgroupname(groupDetails.data?.data.name);
      setgroupNameUpdatedValue(groupDetails.data?.data.name);
    }

    // clean up function which will run after chatId changes
    return () => {
      setgroupname("");
      setgroupNameUpdatedValue("");
      setisEdit(false);
    };
  }, [chatId]);

  const ButtonGroup = (
    <Stack
      direction={{
        sm: "row",
        xs: "column-reverse",
      }}
      spacing={"2rem"}
      p={{
        sm: "1rem",
        xs: "0",
        md: "1rem 4rem",
      }}
    >
      <Button variant="outlined" size="large" onClick={confirmDeleteHandler}>
        Delete
      </Button>
      <Button variant="contained" size="large" onClick={Opentoaddmember}>
        Add
      </Button>
    </Stack>
  );

  return myGroups.isLoading ? (
    <Loader />
  ) : (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        sm={4}
        bgcolor={"#758694"}
      >
        <GroupList myGroups={myGroups?.data?.data} />
      </Grid>

      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconButtons}

        {groupname && (
          <>
            {Groupname}

            <Typography
              margin={"2rem"}
              alignSelf={"flex-start"}
              variant="body1"
            >
              Members
            </Typography>

            <Stack
              maxWidth={"50rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                sm: "1rem",
                xs: "0",
                md: "1rem 4rem",
              }}
              overflow={"auto"}
              spacing={"2rem"}
              bgcolor={"#F3F8FF"}
              height={"70vh"}
            >
              {isLoadingRemoveMember ? (
                <Loader />
              ) : (
                groupDetails.data?.data?.members.map((i) => (
                  <UserItem
                    user={i}
                    key={i._id}
                    isAdded
                    styling={{
                      boxShadow: "0 0 0.5rem  rgba(0,0,0,0.2)",
                      padding: "1rem 2rem",
                      borderRadius: "5rem",
                    }}
                    handler={removeMemberHandler}
                    // from here member Id and chatId Is passed to removeMemberHandler
                  />
                ))
              )}
            </Stack>

            {ButtonGroup}
          </>
        )}
      </Grid>

      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddmemberDialog chatId={chatId} />
        </Suspense>
      )}

      {ConfirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            open={confirmDeleteDialog}
            handleClose={closeConfirmDelteHandler}
            deleteHanlder={deleteHanlder}
          />
        </Suspense>
      )}

      <Drawer
        sx={{
          display: isXscreen ? "block" : "none",
        }}
        open={isMobileOpen && isXscreen}
        onClose={handleMobileclose}
      >
        <GroupList w={"50vw"} myGroups={myGroups?.data?.data} />
      </Drawer>
    </Grid>
  );
};

// It gives the list of groups
const GroupList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack
    width={w}
    sx={{
      bgcolor: "#758694",
      overflow: "auto",
      height: "100vh",
    }}
  >
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem group={group} chatId={chatId} key={group._id} />
      ))
    ) : (
      <div className="text-6xl flex items-center justify-center h-screen">
        {myGroups.length === 0 && <div> 🅷🅰🆅🅸🅽🅶 🅰 🅶🆁🅾🆄🅿🅲🅷🅰🆃 🅼🅰🆃🆃🅴🆁🆂 .....</div>}
      </div>
    )}
  </Stack>
);

// It is Basically a card
const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, content, _id } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Group;
