import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { AdminResponsiveNavbar } from "../../components/admin/AdminResponsiveNavbar";
import { AdminNavbar } from "../../components/admin/AdminNavbar";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import UserTable from "./../../components/admin/UserTable";
import SearchIcon from "@mui/icons-material/Search";
import './Users.css'

export const Users = () => {
  const [responsive, setResponsive] = useState(window.innerWidth);
  const [users, setUsers] = useState([]);
  const [restoreUser, setRestoreUser] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const ResizeFunc = () => {
      setResponsive(window.innerWidth);
    };
    window.addEventListener("resize", ResizeFunc);

    return () => {
      window.removeEventListener("resize", ResizeFunc);
    };
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/allusers`)
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
        setRestoreUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/searchByEmail`, { email: search })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    if (e.target.value === "") {
      setUsers(restoreUser);
    } else {
      setSearch(e.target.value);
    }
  };
  return (
    <Box>
      <ToastContainer />
      {responsive > 738 ? <AdminNavbar /> : <AdminResponsiveNavbar />}
      <Box
        id='parent'
      >
        <Typography variant="h6" align="center" sx={{ my: 2 }}>
          Users
        </Typography>
        <Box
          id='textField'
        >
          <TextField
            type="text"
            placeholder="Search By Email..."
            sx={{ width: "300px" }}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon
                    sx={{ cursor: "pointer" }}
                    onClick={handleSearch}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <UserTable users={users} setUsers={setUsers} />
      </Box>
    </Box>
  );
};
