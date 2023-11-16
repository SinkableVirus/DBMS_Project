import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDonor = () => {
    const [donor, setDonor] = useState({
        donor_name: "",
        Blood_Type: "",
        Blood_Amount: null,
        donor_password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setDonor((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/donor", donor); // Adjust the API endpoint
            navigate("/admin"); // Navigate to the appropriate page after adding a donor
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="add-donor-container">
            <h2>Add a New Donor</h2>
            <form className="donor-form">
                <div className="form-group">
                    <label>Donor Name:</label>
                    <input type="text" name="donor_name" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Blood Type:</label>
                    <input type="text" name="Blood_Type" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Blood Amount:</label>
                    <input type="number" name="Blood_Amount" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Donor Password:</label>
                    <input type="text" name="donor_password" onChange={handleChange} />
                </div>
                <button className="add-button" onClick={handleClick}>
                    Add New Donor
                </button>
            </form>
        </div>
    );
};

export default AddDonor;
