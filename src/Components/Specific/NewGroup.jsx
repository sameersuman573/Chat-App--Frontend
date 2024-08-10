import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import React, { useState, memo , useEffect } from "react";
import { SampleUsers } from "../../Constants/SampleData";
import UserItem from "../Shared/UserItem";
import { useLazySearchUserQuery, useNewGroupMutation } from "../../Redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsNewGroup } from "../../Redux/Reducer/misc";
import toast from "react-hot-toast";
import { useAsycMutation } from "../../hooks/hook";

const NewGroup = () => {
const dispatch = useDispatch();

const {isNewGroup} = useSelector((state) => state.misc)


  const [groupName, setgroupName] = useState("");
  const [selectedMembers, setselectedMembers] = useState("");

  const [users, setusers] = useState([]);
  const [SearchInput, setSearchInput] = useState("");

  const [searchUser] = useLazySearchUserQuery();
  const [newGroup , isLoading] = useAsycMutation(useNewGroupMutation)

  const SelectMemberHandler = (_id) => {
    console.log("Select Member Handler");
    setselectedMembers((prev) =>
      prev.includes(_id)
        ? prev.filter((currElement) => currElement !== _id)
        : [...prev, _id]
    );
  };

  console.log("Select Member Handler", selectedMembers);


  const SubmitHandler = () => {

    if(!groupName) return toast.error("Group Name is required");

    if( selectedMembers.length < 2) return toast.error("Select atleast 2 members");
    console.log(groupName , selectedMembers);

    // creating a group
    newGroup("creating New Group... ", {name:groupName , members: selectedMembers })

    closeHandler();
  };

  // Debouncing concept to display the number of users
  useEffect(() => {
    const timeoutId = setTimeout(() => {

      searchUser(SearchInput).then((res) => {
        const { data } = res;

        if (Array.isArray(data?.data)) {
          setusers(data.data);
        } else {
          console.error("Unexpected data format:", data);
          setusers([]);
        }
      });
    }, 1000);


    return () => {
      clearTimeout(timeoutId);
    };
  }, [SearchInput, searchUser]);


  const IsloadingFriendRequest = () => {
    console.log("Is loading Friend Request");
  };

  

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };

  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack
        direction="column"
        maxWidth={"40rem"}
        p={{ xs: "1rem", sm: "2rem" }}
        spacing={"2rem"}
      >
        <DialogTitle>New group</DialogTitle>

        <TextField
          label="Group Name"
          value={groupName}
          onChange={(e) => setgroupName(e.target.value)}
        />

        <DialogTitle textAlign={"center"}> Find People</DialogTitle>
        <TextField
          label=""
          value={SearchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          variant="outlined"
          size="big"
          InputLabelProps={{
            startAdornment: (
              // Adornment is used to display icon in the input field before you write something
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Typography variant="body1">Members</Typography>

        {/* Actual members */}
        <Stack>
          {users.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={SelectMemberHandler}
              // handlerIsLoading={IsloadingFriendRequest}
            />
          ))}
        </Stack>

        {/* Buttons to Create */}

        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button variant="outlined" color="error" size="large" onClick={closeHandler}>
            CancelSubmitHandler
          </Button>
          <Button variant="contained" size="large" onClick={SubmitHandler} disabled={isLoading}  >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
