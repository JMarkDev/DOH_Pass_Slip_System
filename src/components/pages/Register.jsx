import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext"
import "./../style/Login.css";
import { AiOutlineUser, AiOutlineEyeInvisible } from "react-icons/ai";
import { FiUnlock, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  // const auth = useAuth();
  const [first_name, setfirstName] = useState("");
  const [last_name, setlastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_pass, setconfirm_password] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3001/user/register", {
        first_name, 
        last_name,
        username,
        password,
        confirm_pass
      });
      console.log(data);
      if(data.success) {
        localStorage.setItem('user', JSON.stringify(data.result));
        navigate("/login");
      }
      const error = data?.msg ?? "Registered Successfully"

      alert(error)
      
    } catch (err) {
      console.log(err);
      alert("Register failed. Please try again.");
    }
  };

  return (
    <div className="signup">
      <div className="login_form_container signup_form_container">
        <div className="login_form">
          <h2>Register</h2>
          <form onSubmit={handleSignup}>
          <div className="input_group">
              <AiOutlineUser className="fa" />
              <input
                type="first_name"
                placeholder="First Name"
                className="input_text"
                autoComplete="off"
                value={first_name}
                onChange={(e) => setfirstName(e.target.value)}
              />
            </div>
            <div className="input_group">
              <AiOutlineUser className="fa" />
              <input
                type="last_name"
                placeholder="Last Name"
                className="input_text"
                required
                autoComplete="off"
                value={last_name}
                onChange={(e) => setlastName(e.target.value)}
              />
            </div>
            <div className="input_group">
              <AiOutlineUser className="fa" />
              <input
                type="text"
                placeholder="Username"
                className="input_text"
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
            <div className="input_group">
              <FiUnlock className="fa" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="input_text"
                value={confirm_pass}
                onChange={(e) => setconfirm_password(e.target.value)}
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