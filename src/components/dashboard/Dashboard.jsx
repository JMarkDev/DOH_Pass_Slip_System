import { useEffect, useState, useContext } from "react";
import "../style/Dashboard.css";
import {
  MdOutlineDoneAll,
  MdPendingActions,
} from "react-icons/md";
import { BiSolidUserCheck } from "react-icons/bi";
import Sidebar from "./Sidebar";
import Navbar from "../dashboard/Navbar";
import axios from "axios";
import io from "socket.io-client";
import DashboardTable from "./DashboardTable";

function Dashboard() {
  const [requestData1, setRequestAllData] = useState([]);
  const socket = io.connect("http://localhost:3001");
  const [completedCount, setCompletedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);

  useEffect(() => {
    requestData1.map((status) => {
      if (status.status === 1) {
        setPendingCount((prevCount) => prevCount + 1);
      } else if (status.status === 2) {
        setApprovedCount((prevCount) => prevCount + 1);
      } else if (status.status === 4) {
        setCompletedCount((prevCount) => prevCount + 1);
      }
      return status;
    });
  }, [requestData1]);
  
  const handleRequestAllData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/request");
      const data = response.data;
  
      setRequestAllData(data.data);
    } catch (e) {
      console.log(e);
    }
  };
  
  useEffect(() => {
    handleRequestAllData();
  
    socket.on("receive_request", (data) => {
      handleRequestAllData();
    });
  }, []);
  
  useEffect(() => {
    let pendingCount = 0;
    let approvedCount = 0;
    let completedCount = 0;
  
    requestData1.forEach((status) => {
      if (status.status === 1) {
        pendingCount++;
      } else if (status.status === 2) {
        approvedCount++;
      } else if (status.status === 4) {
        completedCount++;
      }
    });
  
    setPendingCount(pendingCount);
    setApprovedCount(approvedCount);
    setCompletedCount(completedCount);
  }, [requestData1]);  

  return (
      <div>
        <Sidebar />
      <Navbar />
      <div className="dashboard">
        <div className="dashboard__card">
          <div className="cards">
            <div className="card-icon">
              <MdOutlineDoneAll className="icon" />
            </div>
            <div>
              <p className="card-title">No. Completed Request</p>
              <h2 className="total">{completedCount}</h2>
            </div>
          </div>
          <div className="cards">
            <div className="card-icon">
              <MdPendingActions className="icon" />
            </div>
            <div>
              <p className="card-title">No. Pending Request</p>
              <h2 className="total">{pendingCount}</h2>
            </div>
          </div>
          <div className="cards">
            <div className="card-icon">
              <BiSolidUserCheck className="icon" />
            </div>
            <div>
              <p className="card-title">No. Approved Request</p>
              <h2 className="total">{approvedCount}</h2>
            </div>
          </div>
        </div>
        <DashboardTable />
      </div>
      </div>
  );
}

export default Dashboard;
