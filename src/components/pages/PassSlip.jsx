import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import io from "socket.io-client";

function PassSlip() {
  const [selectedOption, setSelectedOption] = useState("");
  const [dateNow, setDateNow] = useState("");

  const socket = io.connect("http://localhost:3001");

  const handleAddPasslip = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const first_name = formData.get("first_name");
    const middle_name = formData.get("middle_name");
    const last_name = formData.get("last_name");
    const time_out = dateNow;
    const request_type = selectedOption;
    const position = formData.get("position");
    const phone_no = formData.get("phone_no");
    const location = formData.get("location");

    const submitData = {
      first_name: first_name,
      last_name: last_name,
      middle_name: middle_name,
      time_out: time_out,
      request_type: request_type,
      position: position,
      phone_no: phone_no,
      location: location,
    };

    try {
      const res = await axios.post(
        "http://localhost:3001/request/add",
        submitData
      );
      console.log(res.data);
      if (res.data.success) {
        socket.emit("send_request", submitData);
      }
      alert(res.data.msg);
    } catch (e) {
      console.log(e);
    }
  };

  const getDateTimeNow = () => {
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    function getHours() {
      const options = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      };

      return today.toLocaleString("en-US", options);
    }

    const time = getHours();
    setDateNow(date + " " + time);
  };

  useEffect(() => {
    getDateTimeNow();
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="pass_slip">
        <div>
          <form onSubmit={handleAddPasslip}>
            <h1 className="title">Permit Slip</h1>
            <p className="title__2">
              (To be prepared In duplicate Org. SG Dup. HRMP)
            </p>
            <div className="date">
              <div className="details">
                <label htmlFor="">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="enter first name"
                />
              </div>
              <div className="details">
                <label htmlFor="">Middle Name</label>
                <input
                  type="text"
                  name="middle_name"
                  placeholder="enter middle name"
                />
              </div>
              <div className="details">
                <label>Last Name</label>
                <input
                  name="last_name"
                  type="text"
                  placeholder="enter last name"
                />
              </div>
              <div className="details">
                <label htmlFor="">Position</label>
                <input
                  type="text"
                  name="position"
                  placeholder="enter position"
                />
              </div>
              <div className="details">
                <label htmlFor="">Phone No.</label>
                <input
                  type="number"
                  name="phone_no"
                  placeholder="enter phone number"
                />
              </div>
              <div className="details">
                <label htmlFor="">Date:</label>
                <input type="text" name="time_out" value={dateNow} disabled />
              </div>
            </div>
            <div>
              <p>Sir/Madam,</p>
              <p className="title__3">
                Permission is requested to leave the Office to attend to:
              </p>
              <div className="select">
                <div>
                  <input
                    type="checkbox"
                    id="personal"
                    value="Personal"
                    checked={selectedOption === "Personal"}
                    onChange={handleOptionChange}
                    className={selectedOption === "Personal" ? "selected" : ""}
                    name="personal"
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
                    name="official"
                    checked={selectedOption === "Official"}
                    onChange={handleOptionChange}
                    className={selectedOption === "Official" ? "selected" : ""}
                  />
                  <label htmlFor="official" className="select1">
                    Official
                  </label>
                </div>
              </div>
              <p className="title__4 title__3">
                (Specify Office/Place to be visited)
              </p>
              <textarea
                className="text__area"
                name="location"
                id=""
                cols=""
                rows="5"
              ></textarea>
            </div>
            <button type="submit" className="submit__btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PassSlip;