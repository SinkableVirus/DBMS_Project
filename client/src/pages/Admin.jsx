import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import { Link } from "react-router-dom";

const Admin = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8800/admin"); // Use Axios to make the GET request
        setData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  return (
    <div>
      <h2>Admin</h2>
      <div className="blood-type-boxes">
        {data.map((item, index) => (
          <div key={item.blood_type} className="blood-type-box">
            <h3>Blood Type: {item.blood_type}</h3>
            <p>Quantity: {item.blood_amount}</p>
  
          </div>
        ))}
      </div>
      <div className="button-container">
      <button className="add-donor-button"><Link to="/add_donor">Add new donor</Link></button>
        
            <button className="view-requests-button"><Link to="/requests">View Requests</Link></button>
            <button className="view-requests-button"><Link to="/delete_donor">Delete a donor</Link></button>
            <button className="delete-donor-button"><Link to="/">Back to Login</Link></button>
        </div>
    </div>
  );
}

export default Admin;
