import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const CustomizedSnackbars = () => {
  const [
    { snackbarOpen, snackbarType, snackbarMessage },
    dispatch,
  ] = useStateValue();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;

    dispatch({
      type: actionTypes.SET_SNACKBAR,
      snackbarOpen: false,
      snackbarType,
      snackbarMessage,
    });
  };
  console.log(snackbarOpen);
  console.log(snackbarType);
  console.log(snackbarMessage);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          color={snackbarType}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomizedSnackbars;
