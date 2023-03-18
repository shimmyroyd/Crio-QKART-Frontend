import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {
  const history = useHistory();
  // console.log(hasHiddenAuthButtons);
    return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        {
          (hasHiddenAuthButtons === false)? 
          (
            (window.localStorage.getItem("token") !== null)?
              (
                <Stack direction={"row"} alignItems={"center"} spacing={2}>
                  <Avatar alt={window.localStorage.getItem("username")} src="avatar.png" />
                  <div>{window.localStorage.getItem("username")}</div>
                  <Button variant="contained" onClick={() => {
                    window.localStorage.clear();
                    window.location.reload();
                  }}>
                    Logout
                  </Button>
                </Stack>
              )
              :
              (
                <Stack direction={"row"} alignItems={"center"} spacing={2}>
                  <Button variant="text" onClick={() => history.push("/login",{from:"ProductsPage"})}>Login</Button>
                  <Button variant="contained" onClick={() => history.push("/register",{from:"ProductsPage"})}>Register</Button>
                </Stack>
              )
          )
          :
          (
            <Button
              className="explore-button"
              startIcon={<ArrowBackIcon />}
              variant="text"
              onClick={() => history.push("/")}
            >
              Back to explore
            </Button>
          )
        }
      </Box>
    );
};

export default Header;
