import {useState} from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import {MdDeleteOutline} from "react-icons/md"
import {BsThreeDots} from "react-icons/bs"
import {BiDislike} from "react-icons/bi"
import {FiXCircle} from "react-icons/fi"
import {AiOutlineSearch} from "react-icons/ai"
import "../style/Request.css"

function Request() {
  const [activeOrderId, setActiveOrderId] = useState(null);

  const requestStatus = (orderId) => {
    setActiveOrderId((prevOrderId) => (prevOrderId === orderId ? null : orderId));
    document.body.classList.add("status");
  };
  const recentRequest = [

    { id: 1,
      requestDate: "2023-7-2 12:58:48 PM",
      employeeName: "Falmark Lumpoc",
      requestFor: "Personal",
      position: "IT",
      // locationVisited: "Pagadian City Department Of Health",
      status: "Pending",
    }, 
    { id: 2,
      requestDate: "2023-7-2 12:58:48 PM",
      employeeName: "Falmark Lumpoc",
      requestFor: "Personal",
      position: "IT",
      // locationVisited: "Pagadian City Department Of Health",
      status: "Pending",
    }
  ];

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

    return ""; // empty string if status is unknown
  };

  return (
    <>
    <Sidebar />
    <Navbar />
    <div className='request'>
    <div className="dashboard-table">
      <div className='top__request'>
        <h2 className="table-title">All Request</h2>
          <div className="search">
          <input className='search__input' type="text" name="" id="" placeholder="search..." />
          <span className="nav__icon search__icon">
            <AiOutlineSearch />
          </span>
      </div>
      </div>
        <table>
      <thead>
        <tr>
        {/* <th>Request Id</th> */}
        <th>Request Date</th>
        <th>Employee Name</th>
        <th>Request For</th>
        <th>Position</th>
        {/* <th>Location</th> */}
        <th>Status</th>
        <th colSpan={2}>Action</th> 
        </tr>
      </thead>
      <tbody>
        {recentRequest.map((request) => (
  <tr key={request.id}>
    {/* <td>{request.id}</td> */}
    <td>{request.requestDate}</td>
    <td>{request.employeeName}</td>
    <td>{request.requestFor}</td>
    <td>{request.position}</td>
    {/* <td>{request.locationVisited}</td> */}
    <td>
      <p className={`order_status ${getRequestStatusClass(request.status)}`}>
        {request.status}
      </p>
    </td>
    <td>
    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      View
    </button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Pass Slip</h1>
      </div>
      <div className="modal-body">

      </div>
      <div className="modal-footer">
      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
    </td>
    <td className="set_status">
      <BsThreeDots className="status_icon" 
      onClick={() => requestStatus(request.id)} />
      {activeOrderId === request.id && (
              <div className="select_status">
              {/* <Link to="/" className="link_status">
              <FiAlertCircle className="link_icon view_icon" />
                Pending
              </Link> */}
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
    </>
    
  )
}

export default Request