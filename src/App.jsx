import "./App.css";
import Pagenotfound from "./components/pages/Pagenotfound";
import PassSlip from "./components/pages/PassSlip";
import Dashboard from "./components/dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";
import Request from "./components/dashboard/Request";
import Verifier from "./components/Verifier/Verifier";
import Archives from "./components/dashboard/Archives";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import UserContext from "./context/UserContext";
import { useState, useContext, useEffect } from "react";
import UserProvider from "./context/UserProvider";
import DashboardTable from "./components/dashboard/DashboardTable";
function App() {
  const user = useState(null);

  return (
    <>
      <UserProvider>
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
          <Route path="/table" element={<DashboardTable />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;