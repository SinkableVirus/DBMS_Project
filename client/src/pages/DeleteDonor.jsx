import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { Link } from "react-router-dom";

const DeleteDonor = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchDonor = async () => {
            try {
                const response = await axios.get("http://localhost:8800/donor");
                setData(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchDonor();
    }, []);

    const handleDelete = async (id, bloodType, bloodAmount) => {
        const response = await axios.get(`http://localhost:8800/check-blood/${bloodType}/${bloodAmount}`);

        if (response.data === "Approved") {
            try {
                await axios.delete(`http://localhost:8800/delete_donor/${id}`);
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        } else {
            alert("Insufficient blood amount for approval.");
        }
    };

    return (
        <div className="delete-donor-container">
            <h1>List of Donors</h1>
            <table className="donor-table">
                <thead>
                    <tr>
                        <th>Donor Name</th>
                        <th>Blood Type</th>
                        <th>Amount</th>
                        <th>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((donor) => (
                        <tr key={donor.donor_id}>
                            <td>{donor.donor_name}</td>
                            <td>{donor.Blood_Type}</td>
                            <td>{donor.Blood_Amount}</td>
                            <td>
                                <button className="delete-button" onClick={() => { handleDelete(donor.donor_id, donor.Blood_Type, donor.Blood_Amount) }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="back-button">
                <Link to="/">Back to Admin Page</Link>
            </button>
        </div>
    );
};

export default DeleteDonor;
