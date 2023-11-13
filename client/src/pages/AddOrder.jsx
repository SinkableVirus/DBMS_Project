import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddOrder = () => {
  const { patientId } = useParams();
  const [order, setOrder] = useState({
    Blood_type: "",
    Blood_amount: null,
    status: 0,
    patient_id: patientId,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setOrder((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Calculate the price as 100 times the Blood_amount
    order.price = 100 * order.Blood_amount;

    try {
      await axios.post("http://localhost:8800/add-order", order);
      navigate(`/patient_dashboard/${patientId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add-order-container">
      <h2 className="order-heading">Add a New Order</h2>
      <form className="order-form">
        <div className="form-group">
          <label className="form-label">Blood Type:</label>
          <input type="text" name="Blood_type" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Blood Amount:</label>
          <input type="number" name="Blood_amount" onChange={handleChange} />
        </div>
        <button className="add-button" onClick={handleClick}>
          Add New Order
        </button>
      </form>
    </div>
  );
};

export default AddOrder;
