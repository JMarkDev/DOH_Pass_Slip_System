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
import { compareDateTime } from "./DashboardTable";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [requestAllData, setRequestAllData] = useState([]);
  const socket = io.connect("http://localhost:3001");
  const [requestData, setRequestData] = useState([]);
  const [user, setUser] = useState(null)
  const [completedCount, setCompletedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const navigate = useNavigate();
  const handleRequestData = async () => {
    const Pending = 1;
    try {
      let { data } = await axios.get(`http://localhost:3001/request/all/${Pending}`);
      const tempData = data.result;
      const sorted = tempData.sort(compareDateTime);
      setRequestData(sorted);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleRequestData();
    const savedUser = JSON.parse(localStorage.getItem("user"))
    if (savedUser) {
      setUser(savedUser)
    }
    else {
      navigate('/login')
    }
    socket.on("receive_request", (data) => {
      handleRequestData();
    });
  }, []);

  useEffect(() => {
    requestAllData.map((status) => {
      if (status.status === 1) {
        setPendingCount((prevCount) => prevCount + 1);
      } else if (status.status === 2) {
        setApprovedCount((prevCount) => prevCount + 1);
      } else if (status.status === 4) {
        setCompletedCount((prevCount) => prevCount + 1);
      }
      return status;
    });
  }, [requestAllData]);
  
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
  
    requestAllData.map((status) => {
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
  }, [requestAllData]);  
  

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
        <DashboardTable requestData={requestData}/>
      </div>
      </div>
  );
}

export default Dashboard;
