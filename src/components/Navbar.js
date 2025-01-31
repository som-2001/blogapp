import { Box } from "@mui/material";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { EncodeMyId } from './EncodeIds';
export const Navbar = () => {
  return (
    <Box className="Navbar">
      <Box className="Navbar1">
        <NavLink to="/" className="navlink">
          Blog App
        </NavLink>
      </Box>
      <Box className="Navbar2">
        <NavLink
          to="/"
          className="navlink"
          style={({ isActive }) => ({
            color: isActive ? "#7979bd" : "black",
          })}
        >
          Home
        </NavLink>
        <NavLink
          to="/Blog"
          className="navlink"
          style={({ isActive }) => ({
            color: isActive ? "#7979bd" : "black",
          })}
        >
          Blog
        </NavLink>
        <NavLink
          to={sessionStorage.getItem("id") ? `/my-blog/${EncodeMyId(sessionStorage.getItem("id"))}`: '/500'}
          className={sessionStorage.getItem("id") ? "navlink": "hide"}
          style={({ isActive }) => ({
            color: isActive ? "#7979bd" : "black",
          })}
        >
          My Blog
        </NavLink>

        <NavLink
          to={sessionStorage.getItem("id") ? `/profile/${EncodeMyId(sessionStorage.getItem("id"))}`: '/500'}
          className={sessionStorage.getItem("id") ? "navlink": "hide"}
          style={({ isActive }) => ({
            color: isActive ? "#7979bd" : "black",
          })}
        >
          Profile
        </NavLink>

        <NavLink
          to="/create"
          className={sessionStorage.getItem("id") ? "navlink": "hide"}
          style={({ isActive }) => ({
            color: isActive ? "#7979bd" : "black",
          })}
        >
          Write
        </NavLink>

        <NavLink
          to="/register"
          className="navlink"
          style={({ isActive }) => ({
            color: isActive ? "#7979bd" : "black",
          })}
        >
          Get Started
        </NavLink>

        <NavLink
          to={sessionStorage.getItem('id')=== null ? '/login' : '/'}
          className="navlink"
          onClick={(e) => sessionStorage.clear()}
        >
          {sessionStorage.getItem('id')=== null ? 'Sign In' : 'Log out'}
        </NavLink>
      </Box>
    </Box>
  );
};
