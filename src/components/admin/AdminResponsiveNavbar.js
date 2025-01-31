import { Box, Divider, Typography } from "@mui/material";
import "./AdminResponsiveNavbar.css";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useNavigate } from "react-router-dom";

export const AdminResponsiveNavbar = () => {
  const [hide, setHide] = useState(false);
  const navigate=useNavigate();

  return (
    <Box sx={{display:'flex',flexDirection:'row',justifyContent:"center",alignItems:'center'}}>
      {hide ? (
        <Box className="responsiveNavbar">
          <div style={{display:'flex',flexDirection:'row',justifyContent:"flex-start",marginLeft:"83px"}}>
            <MenuIcon onClick={() => setHide(!hide)} />
            <Typography variant="body1" sx={{fontWeight:500,fontSize:'1.0rem'}} onClick={()=>navigate('/admin-home')}>Blog App</Typography>
          </div>
          <Divider sx={{ my: 2, width: "100vw" }} />

          <NavLink
            to="/admin-home"
            className="navlink"
            style={({ isActive }) => ({
              color: isActive ? "#7979bd" : "black",
              fontSize:"1.1rem",
              marginBottom:"20px",
              fontWeight:400
            })}
          >
            Home
          </NavLink>
          <NavLink
            to="/user-blogs"
            className="navlink"
            style={({ isActive }) => ({
              color: isActive ? "#7979bd" : "black",
              fontSize:"1.1rem",
              marginBottom:"20px",
              fontWeight:400
            })}
          >
            Blog
          </NavLink>

          <NavLink
            to="/users"
            className="navlink"
            style={({ isActive }) => ({
              color: isActive ? "#7979bd" : "black",
              fontSize:"1.1rem",
              marginBottom:"20px",
              fontWeight:400
            })}
          >
            Users
          </NavLink>

          <NavLink
            to={sessionStorage.getItem('id')=== null ? '/login' : '/'}
            className="navlink"
            onClick={(e) => sessionStorage.clear()}
            style={{
              fontSize:"1.1rem",
              
              fontWeight:400
            }}
          >
           {sessionStorage.getItem('id')=== null ? 'Sign In' : 'Log out'}
          </NavLink>
        </Box>
      ) : (
        <Box className="MenuIcon" >
          <MenuIcon onClick={() => setHide(!hide)} />
          <span onClick={()=>navigate('/admin-home')}>Blog App</span>
        </Box>
      )}
    </Box>
  );
};
