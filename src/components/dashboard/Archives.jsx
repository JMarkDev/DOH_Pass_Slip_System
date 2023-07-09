import { useState,useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import PassSlipTemp from './PassSlipTemp';
import { Modal } from 'react-bootstrap';
import "../style/Archive.css"
import axios from "axios";
import io from "socket.io-client";
import { useReactToPrint } from 'react-to-print';
import { 
  toDateTimeString,
  getRequestStatusClass,
  getStatus,
  compareDateTime
} from './DashboardTable';

function Archives() {
  const [activeOrderId, setActiveOrderId] = useState(null);
  const [user, setUser] = useState(null);
  const [showModalId, setShowModalId] = useState(null);
  const [requestData, setRequestData] = useState([]);
  const [passlips, setPasslips] = useState([]);
  const socket = io.connect("http://localhost:3001");
  const navigate = useNavigate();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const allCompletedSlips = async () => {
    const COMPLETED = 4;
  
    try {
      const { data } = await axios.get(
        `http://localhost:3001/request/all/${COMPLETED}`
      );
      const tempData = data.result
      const sortedData = tempData.sort(compareDateTime)
      setPasslips(sortedData);
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
        <th>Total Hours/Minutes</th>
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
                  <td>{passlip.total_hours} hours {passlip.total_minutes} minutes </td>
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
              <div className="modal-body" ref={componentRef}>
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
                <button type="button" className="btn btn-primary" onClick={handlePrint}>Print</button>
              </div>
            </div>
          </div>
        </Modal>
      ))}
    </>

  )
}

export default Archives;