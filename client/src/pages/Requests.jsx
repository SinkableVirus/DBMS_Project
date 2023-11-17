import React, { useState, useEffect } from "react";
import axios from "axios";

const Requests = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8800/requests");
      setOrders(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const approveOrder = async (orderId, bloodType, bloodAmount) => {
    // Check if there's sufficient blood
    const response = await axios.get(`http://localhost:8800/check-blood/${bloodType}/${bloodAmount}`);

    if (response.data === "Approved") {
      // Implement your logic to update the order status to "Approved"
      // and reduce the blood amount in the blood table
      try {
        // Update the order status
        await axios.put(`http://localhost:8800/approve-order/${orderId}`);

        // Update the blood table by reducing the blood amount
        await axios.put(`http://localhost:8800/update-blood/${bloodType}/${bloodAmount}`);

        // Refresh the orders data after the update
        fetchOrders();
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Insufficient blood amount for approval.");
    }
  };

  const rejectOrder = async (orderId) => {
    try {
      // Update the order status to 2 (Rejected)
      await axios.put(`http://localhost:8800/reject-order/${orderId}`);
  
      // Refresh the orders data after the update
      fetchOrders();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <div className="requests-container">
      <h1>Requests</h1>
      <table className="requests-table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Blood Type</th>
            <th>Blood Amount</th>
            <th>Price</th>
            <th>Order Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td className="patient-name">{order.patient_name}</td>
              <td className="blood-type">{order.blood_type}</td>
              <td className="blood-amount">{order.blood_amount}</td>
              <td className="price">{order.price}</td>
              <td className="price">{order.order_time}</td>
              <td className="status">
                {order.status === 0 ? "Pending" : order.status === 1 ? "Approved" : "Order is rejected"}
              </td>
              <td className="actions">
                {order.status === 0 && (
                  <>
                    <button className="approve-button" onClick={() => approveOrder(order.order_id, order.blood_type, order.blood_amount)}>
                      Approve
                    </button>
                    <button className="reject-button" onClick={() => rejectOrder(order.order_id)}>
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
};

export default Requests;
