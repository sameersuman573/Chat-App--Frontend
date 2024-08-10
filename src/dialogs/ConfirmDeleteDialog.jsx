import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import React from "react";

const ConfirmDeleteDialog = ({ open, handleClose, deleteHanlder }) => {
  return (
    <Dialog
     open={open}
     onClose={handleClose}>

      <DialogTitle> Confrim Delete </DialogTitle>
      <DialogContentText textAlign={"center"}>
        Are you sure to Delete ... Asking last time
      </DialogContentText>
      
      <DialogActions>
           <Button variant="outlined" size="small" onClick={handleClose}>
            cancel
          </Button>
          <Button variant="contained" size="small" onClick={deleteHanlder}>
            Delete
          </Button>
       </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
