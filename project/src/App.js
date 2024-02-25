import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/authentication/SignIn";
import AdminHome from "./components/home/AdminHome";
import { AuthProvider } from "./context/AuthContext";
import Starting from "./components/Starting";
import Admin from "./components/authentication/Admin";
import OfficerHome from "./components/home/OfficerHome";
import AddCase from "./components/case/AddCase";
import CaseOfficer from "./components/case/CaseOfficer";
import ViewCase from "./components/case/ViewCase";
import CaseDetails from "./components/case/details/CaseDetails";
import AddSuspect from "./components/case/AddSuspect";
import Suspects from "./components/case/details/Suspects";
import AddEvidence from "./components/case/AddEvidence";
import Evidence from "./components/case/details/Evidence";
import { Predict } from "./components/case/details/Predict";
import { AddResult } from "./components/case/AddResult";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Starting />}></Route>
          <Route path="evidence" element={<Evidence/>}></Route>
          <Route path="signin" element={<SignIn />}></Route>
          <Route path="adminhome" element={<AdminHome />}></Route>
          <Route path="officerhome" element={<OfficerHome />}></Route>
          <Route path="admin" element={<Admin />}></Route>
          <Route path="addcase" element={<AddCase />}></Route>
          <Route path="caseofficer" element={<CaseOfficer />}></Route>
          <Route path="viewcase" element={<ViewCase />}></Route>
          <Route path="casedetails" element={<CaseDetails />}></Route>
          <Route path="addsuspect" element={<AddSuspect/>}></Route>
          <Route path="suspects" element={<Suspects/>}></Route>
          <Route path="addevidence" element={<AddEvidence/>}></Route>
          <Route path="prediction" element={<Predict />}></Route>
          <Route path="addresult" element={<AddResult />}></Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
