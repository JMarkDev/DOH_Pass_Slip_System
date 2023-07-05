import { useState,useEffect } from 'react';
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import PassSlipTemp from './PassSlipTemp';
import { Modal } from 'react-bootstrap';
import "../style/Archive.css"
import axios from "axios";
import io from "socket.io-client";

function Archives() {
  const [activeOrderId, setActiveOrderId] = useState(null);
  const [showModalId, setShowModalId] = useState(null);
  const [requestData, setRequestData] = useState([]);
  const [passlips, setPasslips] = useState([]);
  const socket = io.connect("http://localhost:3001");

  const allCompletedSlips = async () => {
    const COMPLETED = 4;
  
    try {
      const { data } = await axios.get(
        `http://localhost:3001/request/all/${COMPLETED}`
      );
      console.log(data.result); // Check the value here
      setPasslips(data.result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    allCompletedSlips();
    socket.on("show_completed", (data) => {
      if (data.success) {
        allCompletedSlips();
      }
    });
  }, []);

  const requestStatus = (orderId) => {
    setActiveOrderId((prevOrderId) =>
      prevOrderId === orderId ? null : orderId
    );
    document.body.classList.add("status");
  };

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
    try {
      let { data } = await axios.get("http://localhost:3001/request");
      const tempData = data.data;
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
      <div className="archives">
      <div className="dashboard-table">
        <table>
      <thead>
        <tr>
        <th></th>
        <th>Request Date</th>
        <th>Employee Name</th>
        <th>Request For</th>
        <th>Position</th>
        <th>Status</th>
        <th colSpan={2}>Action</th> 
        </tr>
      </thead>
      <tbody>
              {passlips.map((passlip) => (
                <tr key={passlip.id}>
                  <td><input type="checkbox" /></td>
                  <td>{toDateTimeString(passlip.time_out)}</td>
                  <td>
                  {passlip.first_name} {passlip.middle_name.charAt(0)}. {passlip.last_name}
                  </td>
                  <td>
                    {passlip.request_type === 1
                      ? "Personal"
                      : passlip.request_type === 2
                      ? "Official"
                      : "No Request Type"}
                  </td>
                  <td>{passlip.position}</td>
                  <td>
                    <p
                      className={`order_status ${getRequestStatusClass(
                        passlip.status
                      )}`}
                    >
                      {getStatus(passlip.status)}
                    </p>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => openModal(passlip.id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
    </table>
    </div>
      </div>
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
                <button type="button" className="btn btn-primary">Print</button>
              </div>
            </div>
          </div>
        </Modal>
      ))}
    </>

  )
}

export default Archives;
