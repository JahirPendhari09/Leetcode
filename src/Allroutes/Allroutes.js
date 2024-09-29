import React from "react";
import {  Routes, Route } from "react-router-dom";
import Homepage from "../views/Homepage";
import Header from "../components/common/Header/Header";
import { RecoilRoot } from "recoil";
import Workspace from "../views/Workspace/Workspace";
import Login from "../views/Login";
import PrivateRoute from "../PrivateRoute";
import Problems from "../views/Problems";

const Allroutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/problemset" element={<Problems/>} />
        <Route path="/problemset/:problemName" element={<PrivateRoute><RecoilRoot><Workspace/></RecoilRoot> </PrivateRoute>}/>
        {/* <Route path="/platform" element={<PrivateRoute><RecoilRoot><Workspace/></RecoilRoot> </PrivateRoute>} /> */}
        <Route path="/login" element={<Login/>} />
      </Routes>
    </>
  );
};

export default Allroutes;
