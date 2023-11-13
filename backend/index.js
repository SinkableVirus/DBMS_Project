import express from "express"
import mysql from "mysql"
import cors from "cors"
const app=express()

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Pandu@185",
    database:"blood_bank"
})

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.json("hello")
})

// Route to get orders for a specific patient
app.get("/get-orders-for-patient/:patientId", (req, res) => {
  const { patientId } = req.params;

  // Perform a database query to retrieve orders for the given patient
  const query = "SELECT o.* FROM Order_table o JOIN Purchase p ON o.order_id = p.order_id WHERE p.patient_id = ?";
  db.query(query, [patientId], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Database error" });
    }

    return res.json(results);
  });
});



app.get("/requests", (req, res) => {
    // Replace the following SQL query with your query to retrieve orders
    const sql = "SELECT order_id,patient_name, blood_type, blood_amount, price, status FROM patient NATURAL JOIN purchase NATURAL JOIN order_table";
    
    db.query(sql, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch orders" });
      } else {
        res.json(results);
      }
    });
  });

  app.get('/check-blood/:bloodType/:bloodAmount', (req, res) => {
    const { bloodType, bloodAmount } = req.params;
    const query = 'SELECT blood_amount FROM blood WHERE blood_type = ?';
  
    db.query(query, [bloodType], (err, results) => {
      if (err) {
        console.error('Error querying the database: ' + err);
        return res.status(500).json('Database error');
      }
  
      if (results.length === 0) {
        return res.json('Insufficient'); // Blood type not found
      }
  
      const availableBloodAmount = results[0].blood_amount;
  
      if (availableBloodAmount < bloodAmount) {
        return res.json('Insufficient'); // Not enough blood
      }
  
      return res.json('Approved'); // There's enough blood
    });
  });


  
  app.post("/admin_login",(req,res)=>{
    const adminName=req.body.admin_name;
    const password=req.body.admin_password;
    
    const query = "SELECT * FROM admin WHERE admin_name = ?";
    db.query(query, [adminName], (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Database error" });
      }
  
      if (results.length === 0) {
        return res.json({ success: false, message: "Admin not found" });
      }
  
      const admin = results[0];
      
  
      // Check if the provided password matches the admin's password
      if (admin.admin_password !== password) {
        return res.json({ success: false, message: "Incorrect password" });
      }
  
      // If credentials are correct
      return res.json({ success: true});
    });

  })
  app.post("/patient_login", (req, res) => {
    const { patientName, password } = req.body;
  
    // Query the database to find the patient with the given patient name
    const query = "SELECT * FROM Patient WHERE patient_name = ?";
    db.query(query, [patientName], (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Database error" });
      }
  
      if (results.length === 0) {
        return res.json({ success: false, message: "Patient not found" });
      }
  
      const patient = results[0];
  
      // Check if the provided password matches the patient's password
      if (patient.patient_password !== password) {
        return res.json({ success: false, message: "Incorrect password" });
      }
  
      // If credentials are correct, send the patient's ID
      return res.json({ success: true, patientId: patient.patient_id });
    });
  });

  app.put('/reject-order/:orderId', (req, res) => {
    const { orderId } = req.params;
    const query = 'UPDATE Order_table SET status = 2 WHERE order_id = ?';
  
    // You can use your database connection and execute the query here
    // For example, if you're using MySQL and the 'mysql' package:
    db.query(query, [orderId], (error, results) => {
      if (error) {
        return res.status(500).json('Error updating order status');
      }
      return res.json('Order rejected');
    });
  });
  

// Modify the route to update the order status to "Approved"
app.put('/approve-order/:orderId', (req, res) => {
    const { orderId } = req.params;
    const query = 'UPDATE order_table SET status = 1 WHERE order_id = ?';
  
    db.query(query, [orderId], (err, results) => {
      if (err) {
        console.error('Error updating order status in the database: ' + err);
        return res.status(500).json('Database error');
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).json('Order not found');
      }
  
      return res.json('Order approved');
    });
  });
  
// Modify the route to update the blood table
app.put('/update-blood/:bloodType/:bloodAmount', (req, res) => {
    const { bloodType, bloodAmount } = req.params;
    const query = 'UPDATE blood SET blood_amount = blood_amount - ? WHERE blood_type = ?';
  
    db.query(query, [bloodAmount, bloodType], (err, results) => {
      if (err) {
        console.error('Error updating blood amount in the database: ' + err);
        return res.status(500).json('Database error');
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).json('Blood type not found');
      }
  
      return res.json('Blood amount updated');
    });
  });
  

app.get("/admin",(req,res)=>{
    const q=`select * from blood`
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        else return res.json(data)
    })
})

app.get("/donor",(req,res)=>{
    const q="select * from donor"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        else return res.json(data)
    })
})

app.delete("/delete_donor/:id",(req,res)=>{
  const donor_id=req.params.id
  const q="delete from donor where donor_id=?"
  db.query(q,[donor_id],(err,data)=>{
    if(err) return res.json(err)
    else return res.json(data)
  })
})

app.post("/add-order", (req, res) => {
  const { Blood_type, Blood_amount, price, status, patient_id } = req.body;

  // Insert the new order into the Order_table
  const orderQuery = "INSERT INTO Order_table (Blood_type, Blood_amount, price, status) VALUES (?, ?, ?, ?)";
  db.query(
    orderQuery,
    [Blood_type, Blood_amount, price, status],
    (orderError, orderResults) => {
      if (orderError) {
        return res.status(500).json({ success: false, message: "Database error" });
      }

      // Get the auto-generated order_id from the Order_table
      const order_id = orderResults.insertId;

      // Link the order to the patient in the Purchase table
      const purchaseQuery = "INSERT INTO Purchase (patient_id,hospital_id, order_id) VALUES (?,?, ?)";
      db.query(purchaseQuery, [patient_id,1, order_id], (purchaseError, purchaseResults) => {
        if (purchaseError) {
          return res.status(500).json({ success: false, message: "Database error" });
        }

        return res.json({ success: true, message: "Order added successfully" });
      });
    }
  );
});

app.post("/patient", (req, res) => {
  const patientQuery = "INSERT INTO patient (patient_name, patient_password) VALUES (?)";
  const patientValues = [req.body.patient_name, req.body.patient_password];
  db.query(patientQuery,[patientValues],(err,data)=>{
    if(err) console.log(err)
    else return res.json(data)
  })
});




app.listen(8800,()=>{
    console.log("connected to backend")
})