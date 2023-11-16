import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Admin from "./pages/Admin";
import AddDonor from "./pages/AddDonor";
import "./style.css"
import "./style2.css"
import Requests from "./pages/Requests";
import PatientLogin from "./pages/PatientLogin";
import PatientDashboard from "./pages/PatientDashboard";
import AddOrder from "./pages/AddOrder";
import AdminLogin from "./pages/AdminLogin";
import DeleteDonor from "./pages/DeleteDonor";
import Login from "./pages/Login";
import AddPatient from "./pages/AddPatient";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/add_donor" element={<AddDonor/>}/>
          <Route path="/requests" element={<Requests/>}/>
          <Route path="/patient_login" element={<PatientLogin/>}/>
          <Route path="/patient_dashboard/:patientId" element={<PatientDashboard />} />
          <Route path="/add_order/:patientId" element={<AddOrder/>} />
          <Route path="/admin_login" element={<AdminLogin/>} />
          <Route path="/delete_donor" element={<DeleteDonor/>} />
          <Route path="/add_patient" element={<AddPatient/>} />
          
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
