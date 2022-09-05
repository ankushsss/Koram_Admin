import React from "react";
import { Snackbar,Alert } from "@mui/material";

export default function SuccessMessege(props) {
    const [open, setOpen] = React.useState(true);
  
    return (
      <>
        <Snackbar
          open={props.open}
        >
             <Alert onClose={() => { props.setOpen({open:false})}} severity={props.type} sx={{ width: '100%' }}>
                {props.messege}
            </Alert>
        </Snackbar>
        {/* <Snackbar open={open} onClose={() => setOpen(false)} /> */}
      </>
    );
  }
  