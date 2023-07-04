import { useState } from "react";
import "../style/Dashboard.css";
import {BsThreeDots} from "react-icons/bs"
import {AiFillPrinter} from "react-icons/ai"
import {FiCheckCircle} from "react-icons/fi"
import "../style/Dashboard.css"

function Verifier() {
    const [activeOrderId, setActiveOrderId] = useState(null);
    const requestStatus = (orderId) => {
        setActiveOrderId((prevOrderId) => (prevOrderId === orderId ? null : orderId));
        document.body.classList.add("status");
      };
    
      const recentRequest = [
    
        { id: 1,
          requestDate: "January 01 2023",
          employeeName: "Falmark Lumpoc",
          requestFor: "Personal",
          position: "IT",
          locationVisited: "Pagadian City Department Of Health",
          status: "Approved",
        },
        { id: 2,
          requestDate: "January 01 2023",
          employeeName: "Falmark Lumpoc",
          requestFor: "Personal",
          position: "IT",
          locationVisited: "Pagadian City Department Of Health",
          status: "Approved",
        }
      ];
    
      const getRequestStatusClass = (status) => {
        if (status === "Pending") {
          return "pending";
        } else if (status === "Approved") {
          return "approved";
        } else if (status === "Cancelled") {
          return "cancelled";
        } else if (status === "Completed") {
          return "completed"
        }
    
        return ""; // empty string if status is unknown
      };
  return (
    <div className="verifier">
    <div className="dashboard-table">
    <h2 className="table-title">Recent Request</h2>
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
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
    {recentRequest.map((request) => (
<tr key={request.id}>
<td>{request.id}</td>
<td>{request.requestDate}</td>
<td>{request.employeeName}</td>
<td>{request.requestFor}</td>
<td>{request.position}</td>
<td>{request.locationVisited}</td>
<td>
  <p className={`order_status ${getRequestStatusClass(request.status)}`}>
    {request.status}
  </p>
</td>
<td className="set_status">
  <BsThreeDots className="status_icon" 
  onClick={() => requestStatus(request.id)} />
  {activeOrderId === request.id && (
          <div className="select_status">
            <button className="link_status">
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
  )
}

export default Verifier