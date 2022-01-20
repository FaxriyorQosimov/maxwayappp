import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function SimpleSnackbar({snackOpen, setSnackOpen, messageSnack, snackId}) {
//   const [open, setSnackOpen] = React.useState(false);

  const handleClick = () => {
    setSnackOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      {/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
      <Snackbar
        color="error"
        
        open={snackOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        message={messageSnack}
        action={action}
      >
        <Alert autoHideDuration={3000} onClose={handleClose} severity={snackId} sx={{ width: '100%' }}>
            {messageSnack}
        </Alert>

      </Snackbar>
    </div>
  );
}