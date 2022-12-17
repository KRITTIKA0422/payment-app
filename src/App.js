import React from "react";
import Login from "./Login"; 
import Main from "./Main";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
 
  return (
    <div className="App">

        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main/*" element={
        <ProtectedRoute>
          <Main />
        </ProtectedRoute>}/>
      </Routes>               
    </div>
     
  );
}

function ProtectedRoute({children}){
const isAuth= localStorage.getItem("token")
return isAuth ? children:<Login/>
}

export default App;