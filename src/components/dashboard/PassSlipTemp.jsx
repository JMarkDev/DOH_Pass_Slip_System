import "../style/PassSlipTemp.css";
import { useState } from "react";

function PassSlipTemp({ request }) {
  const [selectedOption, setSelectedOption] = useState(
    request.request_type === 1 ? "Personal" : "Official"
  );
  
  console.log(request.request_type)

  const toDateTimeString = (datetime) => {
    const date = new Date(datetime);

    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    const formattedDate = date.toLocaleString("en-US", options);

    return formattedDate;
  };

  const Time = (time) => {
    if (time === null) {
      return "PENDING";
    }
    const date = new Date(time);

    const options1 = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedDate = date.toLocaleString("en-US", options1);

    return formattedDate;
  }

  const handleOptionChange = (id) => {
    setSelectedOption(id);
  };

  return (
    <>
      <div className="pass_slip_temp">
        <div>
          <p className="title__2">
            (To be prepared In duplicate Org. SG Dup. HRMP)
          </p>
          <div className="date">
            <div className="modal__details">
              <label className="modal__label" htmlFor="">
                No.
              </label>
              <p className="modal__h5">{request.phone_no}</p>
            </div>
            <div className="modal__details">
              <label className="modal__label" htmlFor="">
                Date:
              </label>
              <p className="modal__h5">{toDateTimeString(request.time_out)}</p>
            </div>
            <div className="modal__details">
              <label className="modal__label" htmlFor="">
                Position:
              </label>
              <p className="modal__h5">{request.position}</p>
            </div>
          </div>
          <p className="sir__madam">Sir/Madam,</p>
          <p className="title__3">
            Permission is requested to leave the Office to attend to:
          </p>
          <div className="select">
            <div>
              <input
                type="checkbox"
                id="personal"
                value="Personal"
                onChange={handleOptionChange}
                checked={selectedOption === "Personal"}
                className="selected"
                name="option"
                disabled
              />
              <label htmlFor="personal" className="select1">
                Personal
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="official"
                value="Official"
                onChange={handleOptionChange}
                checked={selectedOption === "Official"}
                className="selected"
                name="option"
                disabled
              />
              <label htmlFor="official" className="select1">
                Official
              </label>
            </div>
          </div>
          <p className="title__3">(Specify Office/Place to be visited)</p>
          <p className=" modal__h5">{request.location}</p>
          <div className="modal__time">
            <p className="modal__h5">TIME OUT: {Time(request.time_out)}</p>
            <p className="modal__h5">TIME IN: {Time(request.time_in)}</p>
          </div>
          <div>
            <div className="employee">
              <h5 className="modal__h5">{request.first_name} {request.middle_name.charAt(0)}. {request.last_name}</h5>
              <p className="printed__name">
                Employee's Printed Name & Signature
              </p>
            </div>
            <div className="approve__by">
              <p className="approved__by">APPROVED BY:</p>
              <h5 className="modal__h5">AGNES E. FERNANDO, Ed. D. MPA, MN</h5>
              <p className="printed__name">DMO-V/PHTL</p>
              <p className="printed__name">
                Authorized Official/Representative
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PassSlipTemp;
