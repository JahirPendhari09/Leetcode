import React from "react";
import {  Routes, Route } from "react-router-dom";
import Homepage from "../views/Homepage";
import Header from "../components/common/Header/Header";
import { RecoilRoot } from "recoil";
import Workspace from "../views/Workspace/Workspace";
import Login from "../views/Login";
import Problems from "../views/Problems";
import Signup from "../views/Signup";

const Allroutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/problemset" element={<Problems/>} />
        <Route path="/problemset/:problemName" element={<RecoilRoot><Workspace/></RecoilRoot>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    </>
  );
};

export default Allroutes;
