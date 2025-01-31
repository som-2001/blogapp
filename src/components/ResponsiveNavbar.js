import { Box, Divider, Typography } from "@mui/material";
import "./ResponsiveNavbar.css";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import { EncodeMyId } from "./EncodeIds";

export const ResponsiveNavbar = () => {
  const [hide, setHide] = useState(false);
  const navigate=useNavigate();

  return (
    <Box sx={{display:'flex',flexDirection:'row',justifyContent:"center",alignItems:'center'}}>
      {hide ? (
        <Box className='responsiveNavbar'>
            <div>
                <MenuIcon onClick={()=>setHide(!hide)}/>
                <Typography variant="body1" onClick={(e)=>navigate('/')}>
                    Blog App
                </Typography>
            </div>
            <Divider sx={{ my: 2, width: "100vw" }} />
            
            <p onClick={(e)=>navigate('/')}>Home</p>
            <p onClick={(e)=>navigate('/Blog')}>Blog</p>

            <p className={sessionStorage.getItem("id") ? "navlink1": "hide"} onClick={(e)=>sessionStorage.getItem("id") ? navigate(`/my-blog/${EncodeMyId(sessionStorage.getItem("id"))}`): navigate('/500')}>My Blog</p>

            <p className={sessionStorage.getItem("id") ? "navlink1": "hide"}  onClick={(e)=>sessionStorage.getItem("id") ? navigate(`/profile/${EncodeMyId(sessionStorage.getItem("id"))}`): navigate('/500')}>Profile</p>

            <p className={sessionStorage.getItem("id") ? "navlink1": "hide"} onClick={(e)=>navigate('/create')}>Write</p>


            <p onClick={(e)=>navigate('/register')}>Get Started</p>
            <p onClick={(e) => {
              sessionStorage.clear();
              sessionStorage.getItem('id')=== null ? navigate('/login') : navigate('/');
            }}>{sessionStorage.getItem('id')=== null ? 'Sign In' : 'Log out'}</p>
        </Box>
      ) : (
        <Box className='MenuIcon'>
          
           <MenuIcon onClick={()=>setHide(!hide)}/>
            <span onClick={(e)=>navigate('/')}>Blog App</span>
          
        </Box>
      )}
    </Box>
  );
};
