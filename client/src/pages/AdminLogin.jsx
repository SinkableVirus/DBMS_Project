// adminLogin.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const AdminLogin = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState({
        admin_name: "",
        admin_password: ""
    });

    const handleChange = (e) => {
        setAdmin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8800/admin_login", admin);
            if (response.data.success) {
                navigate("/");
            } else {
                alert(response.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="admin-login-container">
            <h1 className="login-heading">Admin Login</h1>
            <div className="input-container">
                <input
                    type="text"
                    name="admin_name"
                    placeholder="Admin Name"
                    onChange={handleChange}
                />
            </div>
            <div className="input-container">
                <input
                    type="password"
                    name="admin_password"
                    placeholder="Admin Password"
                    onChange={handleChange}
                />
            </div>
            <button className="login-button" onClick={handleLogin}>
                Login
            </button>
        </div>
    );
};

export default AdminLogin;
