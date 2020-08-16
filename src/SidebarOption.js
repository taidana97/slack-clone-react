import React, { useState } from "react";
import "./SidebarOption.css";
import { useHistory } from "react-router-dom";
import db from "./firebase";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { IconButton, MenuItem, Menu } from "@material-ui/core";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function SidebarOption({ Icon, title, id, addChannelOption, isChannel }) {
  const [hover, setHover] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const [state, dispatch] = useStateValue();

  const open = Boolean(hover);

  const history = useHistory();

  const selectChannel = () => {
    if (id) {
      history.push(`/room/${id}`);
    } else {
      history.push("/" + title);
    }
  };

  const addChannel = () => {
    const channelName = prompt("Please enter the channel name");

    if (channelName) {
      dispatch({
        type: actionTypes.SET_SNACKBAR,
        snackbarOpen: true,
        snackbarType: "success",
        snackbarMessage: "You have successfully added the channel",
      });

      db.collection("rooms").add({
        name: channelName,
      });
    }
  };

  const handlePopoverOpen = (event) => {
    if (isChannel) setHover(event.currentTarget);
  };

  const handlePopoverClose = () => {
    if (isChannel) setHover(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setAnchorEl(null);

    const result = window.confirm(`Do you want to delete #${title} channel?`);

    if (result) {
      db.collection("rooms")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
          dispatch({
            type: actionTypes.SET_SNACKBAR,
            snackbarOpen: true,
            snackbarType: "success",
            snackbarMessage: `You have successfully deleted ${title} the channel`,
          });
          history.push("/");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div
      className={`sidebarOption ${isChannel && "sidebarOption__hover"}`}
      onClick={addChannelOption ? addChannel : selectChannel}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <div className="sidebarOption__channel">
          <h3>
            <span className="sidebarOption__hash">#</span> {title}
          </h3>
        </div>
      )}
      <div>
        {open && isChannel && (
          <IconButton
            className="sidebarOption__iconButton"
            onClick={handleClick}
          >
            <MoreHorizIcon />
          </IconButton>
        )}
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default SidebarOption;
