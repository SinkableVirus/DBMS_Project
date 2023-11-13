import React, { useState } from "react"
import PatientLogin from "./PatientLogin"
import AddPatient from "./AddPatient"
import AdminLogin from "./AdminLogin"




const Login = () => {
    const [content, setContent] = useState(<AdminLogin/>)
    const [format, setFormat] = useState({
        "home": "30px",
        "login": "15px",
        "governmentLogin": "15px",
        "adminLogin": "15px",
        "signUp": "15px"
    })


    const handleClick = (event) => {
        setFormat({
            "home": "15px",
            "login": "15px",
            "governmentLogin": "15px",
            "adminLogin": "15px",
            "signUp": "15px",
            [event.target.id]: "30px"
        })
        if(event.target.id === "login") {
            setContent(<PatientLogin/>)
        } else if(event.target.id === "adminLogin") {
            setContent(<AdminLogin/>)
        }
        else if(event.target.id === "signUp") {
            setContent(<AddPatient/>)
        }
    }


    const wrapper = {
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%"
    }


    const outer = {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        background: "red",
        color: "white",
        padding: "20px"
    }


    const outerContent = {
        margin: "10px",
        padding: "20px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "stretch",
        background: "#eaeaea",
        borderRadius: "10px",
    }


    const listStyle = {
        margin: "20px 10px 10px 50px",
        padding: "20px",
        minWidth: "300px",
        backgroundColor: "#ffffff",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        height: "250px"
    }


    const menu = {
        margin: "25px 100px 100px 100px",
        width: "800px"
    }


    return (
        <div style = {wrapper}>
            <div style = {outer}>
                <h1>Blood Bank Management Database</h1>
            </div>

            <div style = {outerContent}>
                <div style = {listStyle}>
                    <p id = "login" style = {{fontSize: format["login"], transitionDuration: "500ms", cursor: "pointer"}} onClick = {handleClick}>Patient Login</p>
                    <p id = "adminLogin" style = {{fontSize: format["adminLogin"], transitionDuration: "500ms", cursor: "pointer"}} onClick = {handleClick}>Admin Login</p>
                    <p id = "signUp" style = {{fontSize: format["signUp"], transitionDuration: "500ms", cursor: "pointer"}} onClick = {handleClick}>Register Patient</p>
                </div>

                <div style = {menu}>
                    {content}
                </div>
            </div>
        </div>
    )
}


export default Login