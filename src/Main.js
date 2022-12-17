import React from "react";
import { Routes, Route } from "react-router-dom";
import Pizza from "./Pizza";
import Addpizza from "./Addpizza";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import "./Main.css";

export default function Main(){
    const navigate = useNavigate(); 
    return(
        <div className="main">
          <nav className="routing">
  <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={()=>navigate("/main")}>BUY PIZZA</Button>
          <Button color="inherit" onClick={()=>navigate("addpizza")}>ADD PIZZA</Button>
          <Button color="inherit" onClick={()=>navigate("/")}>LOGOUT</Button>
        </Toolbar>
      </AppBar>
      </nav> 

  <Routes>
  <Route path="/" element={<Pizza />} />
  <Route path="addpizza/*" element={<Addpizza />} />
</Routes> 
           </div>
    );
}