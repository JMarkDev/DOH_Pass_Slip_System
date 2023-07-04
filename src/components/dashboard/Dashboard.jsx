import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "../style/Dashboard.css";
import {
  MdOutlineDoneAll,
  MdPendingActions,
  MdDeleteOutline,
} from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { BiDislike, BiSolidUserCheck } from "react-icons/bi";
import { FiXCircle } from "react-icons/fi";
import Sidebar from "./Sidebar";
import Navbar from "../dashboard/Navbar";
import PassSlipTemp from "./PassSlipTemp";
import axios from "axios";
import io from "socket.io-client";

function Dashboard() {
  const [activeOrderId, setActiveOrderId] = useState(null);
  const [showModalId, setShowModalId] = useState(null);
  const [requestData, setRequestData] = useState([]);
  const socket = io.connect("http://localhost:3001");

  const requestStatus = (orderId) => {
    setActiveOrderId((prevOrderId) =>
      prevOrderId === orderId ? null : orderId
    );
    document.body.classList.add("status");
  };

  const handleApproved = async (id) => {
    const APPROVED_STATUS = 2

    try {
      const {data} = await axios.put(`http://localhost:3001/request/update/${APPROVED_STATUS}/${id}`)
      alert(data.msg)
      if(data.success){
        handleRequestData()
      }

    }catch (e) {
      console.log(e)
    }
  }

  const handleCancelled = async (id) => { 
    const CANCELLED_STATUS = 3;

    try{
      const {data} = await axios.put(`http://localhost:3001/request/update/${CANCELLED_STATUS}/${id}`)
      alert(data.msg)
      if(data.success){
        handleRequestData()
      }
    }
    catch(e) {
      console.log(e)
    }
  }

  const handleDeleted = async (id) => {
    try{
      const {data} = await axios.delete(`http://localhost:3001/request/delete/${id}`)
      alert(data.msg)
      if(data.succes){
        handleRequestData()
      }
    }
    catch (e){
      console.log(e)
    }
  }

  const openModal = (orderId) => {
    setShowModalId(orderId);
  };

  const closeModal = () => {
    setShowModalId(null);
  };

  const getRequestStatusClass = (status) => {
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

  const toDateTimeString = (datetime) => {
    const date = new Date(datetime);

    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedDate = date.toLocaleString("en-US", options);

    return formattedDate;
  };

  const compareDateTime = (a, b) => {
    const dateA = new Date(a.time_out);
    const dateB = new Date(b.time_out);

    return dateB - dateA;
  };

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

    socket.on("receive_request", (data) => {
      handleRequestData();
    });
  }, []);

  return (
    <>
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
              <h2 className="total">100k</h2>
            </div>
          </div>
          <div className="cards">
            <div className="card-icon">
              <MdPendingActions className="icon" />
            </div>
            <div>
              <p className="card-title">No. Pending Request</p>
              <h2 className="total">100k</h2>
            </div>
          </div>
          <div className="cards">
            <div className="card-icon">
              <BiSolidUserCheck className="icon" />
            </div>
            <div>
              <p className="card-title">No. Approved Request</p>
              <h2 className="total">100k</h2>
            </div>
          </div>
        </div>
        <div className="dashboard-table">
          <h2 className="table-title">Recent Request</h2>
          <table>
            <thead>
              <tr>
                <th>Request Date</th>
                <th>Employee Name</th>
                <th>Request For</th>
                <th>Position</th>
                <th>Status</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {requestData.map((request) => (
                <tr key={request.id}>
                  <td>{toDateTimeString(request.time_out)}</td>
                  <td>
                    {request.first_name} {request.last_name}
                  </td>
                  <td>
                    {request.request_type === 1
                      ? "Personal"
                      : request.request_type === 2
                      ? "Official"
                      : "No Request Type"}
                  </td>
                  <td>{request.position}</td>
                  <td>
                    <p
                      className={`order_status ${getRequestStatusClass(
                        request.status
                      )}`}
                    >
                      {getStatus(request.status)}
                    </p>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => openModal(request.id)}
                    >
                      View
                    </button>
                  </td>
                  <td className="set_status">
                    <BsThreeDots
                      className="status_icon"
                      onClick={() => requestStatus(request.id)}
                    />
                    {activeOrderId === request.id && (
                      <div className="select_status">
                        <button className="link_status" onClick={() => handleApproved(request.id)}>
                          <BiDislike className="link_icon view_icon" />
                          Approved
                        </button>
                        <button className="link_status" onClick={() => handleCancelled(request.id)}>
                          <FiXCircle className="link_icon reject_icon" />
                          Cancel
                        </button>
                        <button className="link_status" onClick={() => handleDeleted(request.id)}>
                          <MdDeleteOutline className="link_icon accept_icon" />
                          Delete
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
      {/* Modal */}
      {requestData.map((request) => (
        <Modal
          key={request.id}
          show={showModalId === request.id}
          onHide={closeModal}
          aria-labelledby="exampleModalLabel"
          backdrop="static"
          keyboard={false}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Permit Slip
                </h1>
              </div>
              <div className="modal-body">
                <PassSlipTemp request={request} />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </Modal>
      ))}
    </>
  );
}

export default Dashboard;
