import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./../src/context/AuthContext"

import "./components/style/Login.css";
import { AiOutlineUser, AiOutlineEyeInvisible } from "react-icons/ai";
import { FiUnlock, FiEye } from "react-icons/fi";

const Register = () => {
  const auth = useAuth(); 
  const [username, setUsername] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      await auth.register({username, email, password})
    }
     catch (err) {
      console.log(err);
      alert("Sign up failed. Please try again.");
    }
  };
  

  return (
    <div className="signup">
      <div className="login_form_container signup_form_container">
        <div className="login_form">
          <h2>Sign Up</h2>
          <form onSubmit={handleSignup}>
          <div className="input_group">
              <AiOutlineUser className="fa" />
              <input
                type="first_name"
                placeholder="First Name"
                className="input_text"
                autoComplete="off"
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
              />
            </div>
            <div className="input_group">
              <AiOutlineUser className="fa" />
              <input
                type="last_name"
                placeholder="Last Name"
                className="input_text"
                autoComplete="off"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
              />
            </div>
            <div className="input_group">
              <AiOutlineUser className="fa" />
              <input
                type="text"
                placeholder="Username"
                className="input_text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input_group">
              <FiUnlock className="fa" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input_text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <FiEye className="fa eye" onClick={togglePasswordVisibility} />
              ) : (
                <AiOutlineEyeInvisible
                  className="fa eye"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
            <div className="button_group" id="login_button">
              <button type="submit">Register</button>
            </div>
          </form>
          <div className="fotter">
            <span className="footer__text">Already have an account?</span>
            <Link to="/login" className="signup__link">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;