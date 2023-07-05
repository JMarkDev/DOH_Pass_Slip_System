import { useContext, useEffect, useState } from "react";
import "../style/Dashboard.css";
import { BsThreeDots } from "react-icons/bs";
import { AiFillPrinter } from "react-icons/ai";
import { FiCheckCircle } from "react-icons/fi";
import "../style/Dashboard.css";
import axios from "axios";
import io from "socket.io-client";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

function Verifier() {
  const [activeOrderId, setActiveOrderId] = useState(null);
  const [passlips, setPasslips] = useState([]);
  const socket = io.connect("http://localhost:3001");
  const [currentUser] = useContext(UserContext);
  const navigate = useNavigate();
  const handleCompleted = async (id) => {
    const COMPLETED_STATUS = 4;
    try {
      const { data } = await axios.put(
        `http://localhost:3001/request/update/${COMPLETED_STATUS}/${id}`
      );
      alert(data.msg);
      if (data.success) {
        allApproveSlips();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const requestStatus = (orderId) => {
    setActiveOrderId((prevOrderId) =>
      prevOrderId === orderId ? null : orderId
    );
    document.body.classList.add("status");
  };

  const allApproveSlips = async () => {
    const APPROVE = 2;

    try {
      const { data } = await axios.get(
        `http://localhost:3001/request/all/${APPROVE}`
      );
      console.log(data.result); // Check the value here
      setPasslips(data.result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    allApproveSlips();
    socket.on("show_approve", (data) => {
      if (data.success) {
        allApproveSlips();
      }
    });
  }, []);

  const getRequestStatusClass = (status) => {
    console.log(status);
    if (status === 1) {
      return "pending";
    } else if (status === 2) {
      return "approved";
    } else if (status === 3) {
      return "cancelled";
    } else if (status === 4) {
      return "completed";
    }

    return "";
  };
  const getStatus = (status) => {
    if (status === 1) {
      return "Pending";
    } else if (status === 2) {
      return "Approved";
    } else if (status === 3) {
      return "Cancelled";
    } else if (status === 4) {
      return "Completed";
    } else {
      return "";
    }
  };
  return (
    <>
      {currentUser ? (
        <div className="verifier">
          <div className="dashboard-table">
            <h2 className="table-title">Recent Request</h2>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr>
                  <th>Request Id</th>
                  <th>Request Date</th>
                  <th>Employee Name</th>
                  <th>Request For</th>
                  <th>Position</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {passlips.map((passlip) => (
                  <tr key={passlip.id}>
                    <td>{passlip.id}</td>
                    <td>{passlip.time_out}</td>
                    <td>
                      {passlip.first_name} {passlip.last_name}
                    </td>
                    <td>
                      {passlip.request_type === 1 ? "Personal" : "Official"}
                    </td>
                    <td>{passlip.position}</td>
                    <td>{passlip.location}</td>
                    <td>
                      <p
                        className={`order_status ${getRequestStatusClass(
                          passlip.status
                        )}`}
                      >
                        {getStatus(passlip.status)}
                      </p>
                    </td>
                    <td className="set_status">
                      <BsThreeDots
                        className="status_icon"
                        onClick={() => requestStatus(passlip.id)}
                      />
                      {activeOrderId === passlip.id && (
                        <div className="select_status">
                          <button
                            className="link_status"
                            onClick={() => handleCompleted(passlip.id)}
                          >
                            <FiCheckCircle className="link_icon accept_icon" />
                            Completed
                          </button>
                          <button className="link_status">
                            <AiFillPrinter className="link_icon view_icon" />
                            Print
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        navigate("/login")
      )}
    </>
  );
}

export default Verifier;
