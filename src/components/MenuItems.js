import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { decodeMyId } from "./DecodeIds";

const options = ["Edit", "Delete"];

const ITEM_HEIGHT = 48;

export default function MenuItems({ id, setBlogs }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_BASEURL}/deleteBlog/${decodeMyId(id)}`)
      .then((res) => {
        toast.success(res.data.message);
        setBlogs((prevBlog) => prevBlog.filter((item) => item._id !== decodeMyId(id)));
        handleClose();
      }).catch(error=>{
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  const handleEdit = () => {
    navigate(`/edit-blog/${id}`);
    handleClose();
  };

  return (
    <div style={{
      position:"absolute",zIndex:100
    }}>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{color:'white'}}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          },
        }}
      >
        {options.map((option) => (
          <>
            <MenuItem
              key={option}
              selected={option === "Delete"}
              onClick={() => {
                if (option === "Delete") {
                  handleDelete();
                } else if (option === "Edit") {
                  handleEdit();
                }
              }}
            >
              {option}
            </MenuItem>
          </>
        ))}
      </Menu>
    </div>
  );
}
