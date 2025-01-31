import { Box } from "@mui/material";
import "./AdminNavbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
export const AdminNavbar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const id = sessionStorage.getItem("id");
    axios.get(`${process.env.REACT_APP_BASEURL}/getRole/${id}`).then((res) => {
      if (res.data.role !== "admin") {
        navigate("/login");
      }
    });
  }, [navigate]);

  return (
    <Box className="Navbar">
      <Box className="Navbar1">
        <NavLink to="/admin-home" className="navlink">
          Blog App
        </NavLink>
      </Box>
      <Box className="Navbar2">
        <NavLink
          to="/admin-home"
          className="navlink"
          style={({ isActive }) => ({
            color: isActive ? "#7979bd" : "black",
          })}
        >
          Home
        </NavLink>
        <NavLink
          to="/user-blogs"
          className="navlink"
          style={({ isActive }) => ({
            color: isActive ? "#7979bd" : "black",
          })}
        >
          Blog
        </NavLink>

        <NavLink
          to="/users"
          className="navlink"
          style={({ isActive }) => ({
            color: isActive ? "#7979bd" : "black",
          })}
        >
          Users
        </NavLink>

        <NavLink
          to={sessionStorage.getItem('id')=== null ? '/login' : '/'}
          className="navlink"
          onClick={(e) => {
            sessionStorage.clear();
          }}
        >
          {sessionStorage.getItem('id')=== null ? 'Sign In' : 'Log out'}
        </NavLink>
      </Box>
    </Box>
  );
};
