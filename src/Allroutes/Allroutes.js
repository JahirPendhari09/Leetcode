import React from "react";
import {  Routes, Route } from "react-router-dom";
import Homepage from "../views/Homepage";
import Header from "../components/common/Header/Header";
import { RecoilRoot } from "recoil";
import Workspace from "../views/Workspace/Workspace";
import Quizzes from "../views/Quizzes";
import Login from "../views/Login";
import PrivateRoute from "../PrivateRoute";

const Allroutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/platform" element={<PrivateRoute><RecoilRoot><Workspace/></RecoilRoot> </PrivateRoute>} />
        <Route path="/core-quizzes" element={<PrivateRoute><Quizzes/></PrivateRoute>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </>
  );
};

export default Allroutes;
