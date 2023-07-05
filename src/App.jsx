// import { useState } from 'react'
import "./App.css";
import { BrowserRouter, Navigate } from "react-router-dom";
import Pagenotfound from "./components/pages/Pagenotfound";
import PassSlip from "./components/pages/PassSlip";
import Dashboard from "./components/dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";
import Request from "./components/dashboard/Request";
import Verifier from "./components/Verifier/Verifier";
import Archives from "./components/dashboard/Archives";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import { useAuth } from "./context/AuthContext";
import UserContext from "./context/UserContext";
import { useState } from "react";

function App() {
  const user = useState(null);

  return (
    <>
      <UserContext.Provider value={user}>
        <Routes>
          <Route path="/" element={<PassSlip />} />
          <Route path="/pass-slip" element={<PassSlip />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Pagenotfound />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/request" element={<Request />} />
          <Route path="/verifier" element={<Verifier />} />
          <Route path="/archives" element={<Archives />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
