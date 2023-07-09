import { useEffect, useState, useRef } from "react";
import "../style/Dashboard.css";
import { BsThreeDots } from "react-icons/bs";
import { AiFillPrinter } from "react-icons/ai";
import { FiCheckCircle } from "react-icons/fi";
import "../style/Dashboard.css";
import axios from "axios";
import io from "socket.io-client";
import { Modal } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import PassSlipTemp from "../dashboard/PassSlipTemp";
import { getStatus, getRequestStatusClass, toDateTimeString } from "../dashboard/DashboardTable";

function Verifier() {
  const [activeOrderId, setActiveOrderId] = useState(null);
  const [passlips, setPasslips] = useState([]);
  const [showModalId, setShowModalId] = useState(null);
  const socket = io.connect("http://localhost:3001");

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const openModal = (orderId) => {
    setShowModalId(orderId);
  };

  const closeModal = () => {
    setShowModalId(null);
  };

  const handleCompleted = async (id) => {
    const COMPLETED_STATUS = 4;
    try{
      const {data} = await axios.put(`http://localhost:3001/request/update/${COMPLETED_STATUS}/${id}`)
      alert(data.msg)
      if(data.success){
        allApproveSlips();
      }
    }
    catch (e) {
      console.log(e)
    }
  }

  const requestStatus = (orderId) => {
    setActiveOrderId((prevOrderId) =>
      prevOrderId === orderId ? null : orderId
    );
    document.body.classList.add("status");
  };

  const compareDateTime = (a, b) => {
    const dateA = new Date(a.time_out);
    const dateB = new Date(b.time_out);

    return dateB - dateA;
  };

  const allApproveSlips = async () => {
    const APPROVE = 2;
  
    try {
      const { data } = await axios.get(
        `http://localhost:3001/request/all/${APPROVE}`
      );
      const tempData = data.result;
      const sorted = tempData.sort(compareDateTime);
      setPasslips(sorted);
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

  return (
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
        <td>{toDateTimeString(passlip.time_out)}</td>
        <td>
          {passlip.first_name} {passlip.middle_name.charAt(0) + '.'} {passlip.last_name}
        </td>
        <td>{passlip.request_type === 1 ? "Personal" : "Official"}</td>
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
            <button className="link_status" onClick={() => handleCompleted(passlip.id)}>
              <FiCheckCircle className="link_icon accept_icon" />
              Completed
            </button>
            <button className="link_status" onClick={() => openModal(passlip.id)}>
              <AiFillPrinter className="link_icon view_icon" />
              Print/View
            </button>
          </div>
        )}
      </td>
    </tr>
  ))}
          </tbody>
        </table>
        {passlips.map((request) => (
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
      </div>
    </div>
  );
}

export default Verifier;