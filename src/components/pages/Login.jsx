import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"
import "./../style/Login.css";
import { AiOutlineUser, AiOutlineEyeInvisible } from "react-icons/ai";
import { FiUnlock, FiEye } from "react-icons/fi";
import UserContext from "../../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const auth = useAuth();
  // const { setUser } = useContext(UserContext);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();

  const onHandleLogin = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3001/user/login", {
        username,
        password,
      });
      console.log(data);
      if(data.success) {
        localStorage.setItem('user', JSON.stringify(data.result));
        // setUser(data.result);
        navigate("/dashboard");
      }
      const error = data?.msg ?? "Login Successfully"

      alert(error)
      
    } catch (err) {
      console.log(err);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="login">
      <div className="login_form_container">
        <div className="login_form">
          <h2>Log In</h2>
          <form onSubmit={onHandleLogin}>
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
                required
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
              <button type="submit">Log In</button>
            </div>
          </form>
          <div className="fotter">
            <span className="footer__text">Don't have an account?</span>
            <Link to="/register" className="signup__link">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;