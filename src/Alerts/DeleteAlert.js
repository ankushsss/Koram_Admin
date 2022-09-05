import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import axios from 'axios';

export default function DeleteAlert(props) {
//   const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    props.setOpen(true);
  };

  const handleClose = () => {
    props.setOpen(false);
  };
  const deleteData = () =>{
    axios.delete(`${props.path}${props.id}`).then(
        (res)=>{
            console.log(res)
            handleClose()
            props.setRightDrawer({"right":false})
            props.setAlertMssg({open:true,messege:"successfully delete",type:"success"})
            props.reload()
      
        })
  .catch((err)=>{
    props.setRightDrawer({"right":false})
    handleClose()
    props.setAlertMssg({open:true,messege:err.message,type:"error"})
  })
}
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete 
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={deleteData} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
}
