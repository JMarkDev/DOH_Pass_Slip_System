import React, { useState, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_API = "http://localhost:3001/user";

const AuthContext = createContext(null);

function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
  };

  async function login({ username, password }) {
    try {
      const userCredentials = {
        username: username,
        password: password,
      };
  
      const response = await axios.post(
        `${BACKEND_API}/login`,
        userCredentials,
        { responseType: "json" }
      );
  
      if (response.data.success) {
        setUser(response.data.user);
        navigate("/dashboard");
        alert("Login Successfully");
      } else {
        console.log(response.data);
        alert("Invalid username/password");
      }
    } catch (err) {
      console.log(err);
      alert("Login failed. Please try again.");
    }
  }
  
  function register(userData) {
    const {  
      first_name,
      last_name,
      username,
      password, 
      confirm_pass } = userData;
  
    fetch(`${BACKEND_API}/register`, {
      method: "POST",
      body: JSON.stringify({ 
        first_name,
        last_name,
        username,
        password,
        confirm_pass }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.user);
          navigate("/dashboard");
          alert("Register Successfully");
          console.log("working");
        } else {
          alert("Error");
          console.log("error");
        }
      });
  }
  

  const value = {
    user,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, useAuth };