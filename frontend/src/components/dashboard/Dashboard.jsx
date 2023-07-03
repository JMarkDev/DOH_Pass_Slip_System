import { useState } from "react";
import { Modal } from "react-bootstrap";
import "../style/Dashboard.css";
import {MdOutlineDoneAll, MdPendingActions, MdDeleteOutline} from "react-icons/md"
import {BsThreeDots} from "react-icons/bs"
import {BiDislike, BiSolidUserCheck} from "react-icons/bi"
import {FiXCircle} from "react-icons/fi"
import Sidebar from "./Sidebar";
import Navbar from "../dashboard/Navbar";
import PassSlipTemp from "./PassSlipTemp";

export const recentRequest = [
  {
    id: 1,
    requestDate: "07-03-2023",
    employeeName: "Falmark Lumpoc",
    requestFor: "Personal",
    position: "IT Programmer",
    phoneNo: "09123456789",
    locationVisited: "Pagadian City Department Of Health",
    timeOut: "1:55:15 PM",
    status: "Pending",
  },
  {
    id: 2,
    requestDate: "2023-7-2",
    employeeName: "Josiel Mark Cute",
    requestFor: "Personal",
    position: "IT Programmer",
    phoneNo: "09123456789",
    locationVisited: "Pagadian City Department Of Health",
    timeOut: "1:55:15 PM",
    status: "Pending",
  },
];

function Dashboard() {
  const [activeOrderId, setActiveOrderId] = useState(null);
  const [showModalId, setShowModalId] = useState(null);

  const requestStatus = (orderId) => {
    setActiveOrderId((prevOrderId) => (prevOrderId === orderId ? null : orderId));
    document.body.classList.add("status");
  };

  const openModal = (orderId) => {
    setShowModalId(orderId);
  };

  const closeModal = () => {
    setShowModalId(null);
  };

  const getRequestStatusClass = (status) => {
    if (status === "Pending") {
      return "pending";
    } else if (status === "Approved") {
      return "Approved";
    } else if (status === "Cancelled") {
      return "cancelled";
    } else if (status === "Completed") {
      return "completed"
    }

    return ""; 
  };

  return (
    <>
    <Sidebar />
    <Navbar />
    <div className="dashboard">
    <div className='dashboard__card'>
      <div className='cards'>
        <div className='card-icon'>
          <MdOutlineDoneAll className='icon' />
        </div>
        <div>
          <p className='card-title'>No. Completed Request</p>
          <h2 className='total'>100k</h2>
        </div>
      </div>
      <div className='cards'>
        <div className='card-icon'>
          <MdPendingActions className='icon'/>
        </div>
        <div>
          <p className='card-title'>No. Pending Request</p>
          <h2 className='total'>100k</h2>
        </div>
      </div>
      <div className='cards'>
        <div className='card-icon'>
          <BiSolidUserCheck className='icon' />
        </div>
        <div>
          <p className='card-title'>No. Approved Request</p>
          <h2 className='total'>100k</h2>
        </div>
      </div>
    </div>
    <div className="dashboard-table">
        <h2 className="table-title">Recent Request</h2>
        <table>
      <thead>
        <tr>
        {/* <th>Request Id</th> */}
        <th>Request Date</th>
        <th>Employee Name</th>
        <th>Request For</th>
        <th>Position</th>
        <th>Status</th>
        <th colSpan={2}>Action</th> 
        </tr>
      </thead>
      <tbody>
        {recentRequest.map((request) => (
  <tr key={request.id}>
    <td>{request.requestDate}</td>
    <td>{request.employeeName}</td>
    <td>{request.requestFor}</td>
    <td>{request.position}</td>
    <td className="status">
      <p className={`order_status ${getRequestStatusClass(request.status)}`}>
        {request.status}
      </p>
    </td>
    <td>
    <button
         type="button"
        className="btn btn-primary"
        onClick={() => openModal(request.id)}>
        View
      </button>
     </td>
    <td className="set_status">
      <BsThreeDots className="status_icon" 
      onClick={() => requestStatus(request.id)} />
      {activeOrderId === request.id && (
              <div className="select_status">
              <button className="link_status">
              <BiDislike className="link_icon view_icon" />
            
                Approved
              </button>
              <button className="link_status">
                <FiXCircle className="link_icon reject_icon" />
                Cancel
              </button>
              <button className="link_status">
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
    {recentRequest.map((request) => (
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