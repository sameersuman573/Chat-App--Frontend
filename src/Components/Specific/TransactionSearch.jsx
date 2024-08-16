import { Search as SearchIcon } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../../Redux/Reducer/misc";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
  useNewChatMutation
} from "../../Redux/api/api";
import UserItem from "../Shared/UserItem";
import toast from "react-hot-toast";
import { useAsycMutation } from "../../hooks/hook";
import TransactionUserItem from "../Shared/TransactionItem";
import { useNavigate } from "react-router-dom";

const TransactionSearch = () => {
  const [SearchInput, setSearchInput] = useState("");
  const [users, setusers] = useState([]);
  const [loadingId, setloadingId] = useState(false);
  const [selectedMembers, setselectedMembers] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSearch } = useSelector((state) => state.misc);

  const [searchUser] = useLazySearchUserQuery();

  const [sendFriendRequest, IsloadingSendFriendRequest] = useAsycMutation(
    useSendFriendRequestMutation
  );

  const [newChat , isLoading] = useAsycMutation(useNewChatMutation)

  const selectMemberHanlder = (_id) => {
    setselectedMembers(_id)
    console.log("member ID is Selected", _id);
  }


  useEffect(() => {
    console.log("This Is the Selcted member", selectedMembers);
  }, [selectedMembers])
  

const SubmitHandler = () => {

  if( selectedMembers.length < 1) return toast.error("Select atleast 1 member to create a chat");
  
  console.log("selected member Length" , selectedMembers);

  newChat("Creating a one & one Chat...", {receiverId: selectedMembers});

  console.log("Submit Handler for creating a chat");
}


const handleNavigation = () => {
    if( selectedMembers.length < 1) return toast.error("Select atleast 1 member to Send money");
    console.log("selected member Length" , selectedMembers.length);


    if (selectedMembers) {
        console.log("Here is the ID of selected member" , selectedMembers); // Logs the _id of the selected member
    }

    // if (!user._id || !user.username || !user.fullname) {
        if (!selectedMembers) {
        console.error("User object is missing properties");
        return;
    }

    // navigate(`/send?id=${user._id}&username=${user.username}&fullname=${user.fullname}`);
    navigate(`/send?id=${selectedMembers}`);

};
  


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


  
  // const addFriendHanlder = async (id) => {
  //   console.log(id);
  //   await sendFriendRequest("Sending friend request...", { userId: id });
  // };

  // const IsloadingFriendRequest = (id) => {
  //   console.log(id);
  //   console.log("The button is pressed");
  // };

  const CloseSearchDialog = () => {
    setselectedMembers(null);
    dispatch(setIsSearch(false));
  };

  return (
    <>
      <Dialog open={isSearch} onClose={CloseSearchDialog}>
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
              <TransactionUserItem
                user={p}
                key={p._id}
                handler={selectMemberHanlder}
                // handlerIsLoading={IsloadingSendFriendRequest}
              />
            ))}
          </List>


          <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button variant="contained" size="large" onClick={handleNavigation} disabled={isLoading}  >
            Send Money
          </Button>
        </Stack>

        </Stack>
      </Dialog>
    </>
  );
};

export default TransactionSearch;
