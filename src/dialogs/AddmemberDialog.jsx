import { Search as SearchIcon } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserItem from "../Components/Shared/UserItem";
import { setIsAddMember } from "../Redux/Reducer/misc";
import {
  useAddGroupMemberMutation,
  useLazySearchUserQuery,
} from "../Redux/api/api";
import { useAsycMutation } from "../hooks/hook";

const AddmemberDialog = ({ chatId }) => {
  const dispatch = useDispatch();
  // const chatId = useSearchParams()[0].get("group");

  const [addGroupMember, isLoadingAddMember] = useAsycMutation(
    useAddGroupMemberMutation
  );

  const [searchUser] = useLazySearchUserQuery();

  const { isAddMember } = useSelector((state) => state.misc);

  const [selectedMembers, setselectedMembers] = useState("");

  const [SearchInput, setSearchInput] = useState("");
  const [users, setusers] = useState([]);

  // VERY IMPORTANT - DEBOUNCING CONCEPT

  // Debouncing concept is used to reduce the number of api calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchUser(SearchInput).then((res) => {
        const { data } = res;

        // check if it is an array if array Display the Username with its avatar
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

  const SelectMemberHandler = (_id) => {
    console.log("Select Member Handler");
    setselectedMembers((prev) =>
      prev.includes(_id)
        ? prev.filter((currElement) => currElement !== _id)
        : [...prev, _id]
    );
  };

  console.log("Select Member Handler", selectedMembers);

  const addMemberSubmitHandler = () => {
    console.log("Add member submit handler");
    addGroupMember("Adding Member...", { chatId, memberId: selectedMembers });
    console.log("Add member submit handler");
    closeHandler();
  };

  const closeHandler = () => {
    setselectedMembers([]);
    setusers([]);
    dispatch(setIsAddMember(false));
  };

  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack>
        <DialogTitle textAlign={"center"}>Add memeber</DialogTitle>
        <Stack p={"2rem"} direction={"column"} width={"25rem"}>
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

          <List>
            {users.map((p) => (
              <UserItem
                user={p}
                key={p._id}
                handler={SelectMemberHandler}
                // handlerIsLoading={IsloadingSendFriendRequest}
              />
            ))}
          </List>
        </Stack>

        <Stack
          direction={"column"}
          spacing={"1rem"}
          alignItems={"center"}
          alignContent={"center"}
        >
          <Button color="error" type="submit" onClick={addMemberSubmitHandler}>
            Submit
          </Button>
          <Button
            onClick={closeHandler}
            variant="contained"
            disabled={isLoadingAddMember}
          >
            cancel
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddmemberDialog;
