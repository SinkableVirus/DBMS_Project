import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const PatientDashboard = () => {
  const { patientId } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders for the given patient using the patientId
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/get-orders-for-patient/${patientId}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchOrders();
  }, [patientId]);

  return (
    <div className="patient-dashboard-container">
      <h1 className="dashboard-heading">Patient Dashboard</h1>
      <p className="welcome-message">Welcome, Patient ID: {patientId}</p>
      <h2 className="orders-heading">Orders:</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Blood Type</th>
            <th>Blood Amount</th>
            <th>Price</th>
            <th>Order Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td>{order.Blood_type}</td>
              <td>{order.Blood_amount}</td>
              <td>{order.price}</td>
              <td>{order.order_time}</td>
              <td>{order.status === 1 ? 'Approved' : order.status === 0 ? 'Pending' : 'Rejected'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={`/add_order/${patientId}`}>
        <button className="order-table-button">Add New Order</button>
      </Link>
      <button className="delete-donor-button"><Link to="/">Back to Login</Link></button>
    </div>
  );
};

export default PatientDashboard;
