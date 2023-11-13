import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPatient = () => {
    const [patient, setPatient] = useState({
        patient_name: "",
        patient_password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setPatient((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/patient", patient); // Adjust the API endpoint
            window.location.reload(); // Navigate to the appropriate page after adding a donor
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="add-donor-container">
            <h2>Register New Patient</h2>
            <form className="donor-form">
                <div className="form-group">
                    <label>Patient Name:</label>
                    <input type="text" name="patient_name" onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Patient Password:</label>
                    <input type="text" name="patient_password" onChange={handleChange} />
                </div>
                <button className="add-button" onClick={handleClick}>
                    Register
                </button>
            </form>
        </div>
    );
};

export default AddPatient;
