import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PatientLogin = () => {
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8800/patient_login", {
        patientName,
        password,
      });

      if (response.data.success) {
        navigate(`/patient_dashboard/${response.data.patientId}`);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="patient-login-container">
      <h1 className="login-heading">Patient Login</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default PatientLogin;
