import React from "react";
import {  Routes, Route } from "react-router-dom";
import Homepage from "../views/Homepage";
import Header from "../components/common/Header/Header";
import { RecoilRoot } from "recoil";
import Workspace from "../views/Workspace/Workspace";
import Quizzes from "../views/Quizzes";

const Allroutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/platform" element={<RecoilRoot><Workspace/></RecoilRoot> } />
        <Route path="/core-quizzes" element={<Quizzes/>} />
      </Routes>
    </>
  );
};

export default Allroutes;
