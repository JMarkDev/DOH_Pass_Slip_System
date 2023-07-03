import { useState } from 'react';
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import "../style/Archive.css"


function Archives() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      status: "Completed",
    }, 
    { id: 2,
      requestDate: "2023-7-2 12:58:48 PM",
      employeeName: "Falmark Lumpoc",
      requestFor: "Personal",
      position: "IT",
      // locationVisited: "Pagadian City Department Of Health",
      status: "Completed",
    },
    { id: 3,
      requestDate: "2023-7-2 12:58:48 PM",
      employeeName: "Falmark Lumpoc",
      requestFor: "Personal",
      position: "IT",
      // locationVisited: "Pagadian City Department Of Health",
      status: "Completed",
    },
    { id: 4,
      requestDate: "2023-7-2 12:58:48 PM",
      employeeName: "Falmark Lumpoc",
      requestFor: "Personal",
      position: "IT",
      // locationVisited: "Pagadian City Department Of Health",
      status: "Completed",
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
      <div className="archives">
      <div className="dashboard-table">
        <table>
      <thead>
        <tr>
        {/* <th>Request Id</th> */}
        <th></th>
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
    <td><input type="checkbox" /></td>
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
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary">Print</button>
      </div>
    </div>
  </div>
</div>
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

export default Archives;
