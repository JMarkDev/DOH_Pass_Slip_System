import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import PassSlipTemp from "./PassSlipTemp";
import { Modal } from "react-bootstrap";
import { MdDeleteOutline } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { BiDislike } from "react-icons/bi";
import { FiXCircle } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
import "../style/Request.css";
import axios from "axios";
import io from "socket.io-client";
import { getRequestStatusClass } from "./DashboardTable";
import { getStatus } from "./DashboardTable";
import { toDateTimeString } from "./DashboardTable";

function Request() {
  const [activeOrderId, setActiveOrderId] = useState(null);
  const [showModalId, setShowModalId] = useState(null);
  const [requestData, setRequestData] = useState([]);
  const socket = io.connect("http://localhost:3001");
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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

  const handleApproved = async (id) => {
    const APPROVED_STATUS = 2

    try {
      const {data} = await axios.put(`http://localhost:3001/request/update/${APPROVED_STATUS}/${id}`)
      alert(data.msg)
      if(data.success){
        handleRequestData()
        socket.emit("send_aprrove", { success: true });
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

  
 const searchRequest = requestData.filter((request) => {
  if (searchTerm === "") {
    return request;
  } 
  if (request.first_name.toLowerCase().includes(searchTerm.toLowerCase()) 
  || request.last_name.toLowerCase().includes(searchTerm.toLowerCase())
  || request.middle_name.toLowerCase().includes(searchTerm.toLowerCase())
  ){
    return request;
  } else {
    return false;
  }
});

  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="request">
        <div className="dashboard-table">
          <div className="top__request">
            <h2 className="table-title">All Request</h2>
            <div className="search">
              <input
                className="search__input"
                type="text"
                placeholder="search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="nav__icon search__icon">
                <AiOutlineSearch />
              </span>
            </div>
          </div>
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
              {searchRequest.map((request) => (
                <tr key={request.id}>
                  <td>{toDateTimeString(request.time_out)}</td>
                  <td>
                  {request.first_name} {request.middle_name.charAt(0)}. {request.last_name}
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

export default Request;
