const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const cors = require('cors');
const jwtAuth = require('./middleware');
const app = express();
const port = 3000;
const key = "moonchild"

app.use(cors())
app.use(express.json())

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "blood_donation"
})

conn.connect(function(err){
    if(err) throw err
    else console.log("Connection established")
})

app.get('/states',(req,res)=>{
    conn.query("select * from states",function(err,result){
        if(err) throw err
        else res.send(result)
    })
})

app.get('/cities/:s_id',(req,res)=>{
    const s_id = req.params.s_id
    conn.query(`select c_id,city from cities where s_id = ${s_id}`,function(err,result){
        if(err) throw err
        else res.send(result)
    })
})

app.get('/findblood/:blood/:state/:city',(req,res)=>{
    const blood = req.params.blood
    const state = req.params.state
    const city = req.params.city
    conn.query(`select d_id,fname, lname, bloodgroup, gender, phone, email, states.state, cities.city from donors left join states on donors.stateid = states.s_id left join cities on donors.cityid = cities.c_id where bloodgroup = ? AND donors.stateid = ? AND donors.cityid = ?`,[blood, state, city],function(err,result){
        if(err) throw err
        else res.send(result)
    })
})

app.post('/donors',(req,res)=>{
    const donorData = req.body
    conn.query("INSERT INTO donors(fname,lname,bloodgroup,gender,phone,stateid,cityid,email) VALUES (?,?,?,?,?,?,?,?)",[donorData.fname,donorData.lname,donorData.bloodgroup,donorData.gender,donorData.phone,donorData.state,donorData.city,donorData.email],function(err,result){
        if(err) throw err
        else res.send(result)

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'ishikamarwaha12@gmail.com',         
              pass: 'ejxkinqrjiohxkbp'             
            }
        });
      
        const mailOptions = {
            from: '"United By Blood Team" <ishikamarwaha12@gmail.com>',
            to: donorData.email,
            subject: 'Thank You for Registering as a Donor!',
            html: `
                <h2>Hello ${donorData.fname} ${donorData.lname},</h2>
                <p>Thank you for registering as a blood donor. Your support can help save lives!</p>
                <p>We will contact you when someone is in need of your blood type.</p>
                <br/>
                <p>Regards,<br/>Blood Donation Team</p>
                `,
        };
      
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Email error:', error);
              return res.status(500).send('Donor added, but email failed.');
            } else {
              console.log('Email sent:', info.response);
              return res.send({ message: 'Donor added and email sent!', result });
            }
        })
    })
})

app.post('/requestBlood',(req,res)=>{
    const requestData = req.body
    conn.query("insert into request_blood(pname,hname,bloodgroup,state,city,phone,email,urgency,units) values (?,?,?,?,?,?,?,?,?)",[requestData.pname,requestData.hname,requestData.bloodgroup,requestData.state,requestData.city,requestData.phone,requestData.email,requestData.urgency,requestData.units],function(err,result){
        if(err) throw err
        else res.send(result)

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ishikamarwaha12@gmail.com',
                pass: 'ejxkinqrjiohxkbp'
            }
        })

        const mailOptions = {
            from: '"United By Blood" <ishikamarwaha12@gmail.com>',
            to: requestData.email,
            subject: 'Blood Request Received! We are Here to Help!',
            html: `<h2 style="color: #d32f2f;">Blood Request Confirmation</h2>
                   <p>Dear <strong>${requestData.pname}</strong>,</p>
                   <p>Thank you for submitting your blood request with us. We have received your request for <strong>${requestData.bloodgroup}</strong> and our team is actively working to fulfill it.</p>
                   <h3 style="color: #444;">Your Request Details:</h3>
                   <ul style="line-height: 1.6;">
                    <li><strong>Blood Group:</strong> ${requestData.bloodgroup}</li>
                    <li><strong>Units Needed:</strong> ${requestData.units}</li>
                    <li><strong>Location:</strong> ${requestData.city}, ${requestData.state}</li>
                    <li><strong>Contact Number:</strong> ${requestData.phone}</li>
                   </ul>
                   <p>We understand the urgency of your need and are coordinating with available donors in your area. You will be notified as soon as a match is found.</p>
                   <p>If you have any updates or need immediate assistance, feel free to contact us at <a href="mailto:ishikamarwaha12@gmail.com">support@bloodbank.com</a>.</p> 
                   <p>Stay strong, help is on the way.</p>
                   <p style="margin-top: 30px;">Warm regards,<br><strong>United By Blood Team</strong></p>`
        }

        transporter.sendMail(mailOptions,(err,info)=>{
            if (err) {
                console.error('Email error:', err);
                return res.status(500).send('Request added, but email failed.');
              } else {
                console.log('Email sent:', info.response);
                return res.send({ message: 'Request added and email sent!', result });
              }
        })
    })
})

app.post('/loginValidation',(req,res)=>{
    const loginData = req.body
    conn.query("select email,lname from donors where email=?",[loginData.username],function(err,result){
        if(err) throw err
        
        if(result.length>0){
            const data = result[0]
            if(data.lname.toLowerCase() === loginData.pass.toLowerCase()){
                const token = jwt.sign({username: loginData.username}, key)
                res.json({success: true, message: 'Donor authenticated', token})
            }else{
                res.json({success: false, message: 'Invalid Credentials' })
            }
        }else{
            res.json({success:false, message:'Email not found'})
        }
    })
})

app.post('/donorLoginData',jwtAuth,(req,res)=>{
    const email = req.user.username
    conn.query("select donors.d_id,fname, lname, donors.bloodgroup, gender, donors.phone, donors.email, DATE_FORMAT(donation_history.last_updated, '%d-%M-%Y') as date, states.state, cities.city from donors left join donation_history on donors.d_id = donation_history.d_id left join states on donors.stateid = states.s_id left join cities on donors.cityid = cities.c_id where email=?",[email],function(err,result){
        if(err) throw err
        else res.send(result)
    })
})

app.get('/editDonorData/:username',jwtAuth,(req,res)=>{
    const username = req.params.username
    conn.query("select donors.d_id,fname, lname, donors.bloodgroup, gender, donors.phone, donors.email, stateid, cityid, DATE_FORMAT(donation_history.last_updated, '%d-%M-%Y') as date, states.state, cities.city from donors left join donation_history on donors.d_id = donation_history.d_id left join states on donors.stateid = states.s_id left join cities on donors.cityid = cities.c_id where email=?",[username],function(err,result){
        if(err) throw err
        else res.send(result)
    })
})

app.post('/updateDonorData',(req,res)=>{
    const updateData = req.body
    conn.query("update donors set phone = ?,stateid = ?,cityid = ?,email = ? where d_id = ?",[updateData.phone,updateData.stateid,updateData.cityid,updateData.email,updateData.d_id],function(err,result){
        if(err) throw err
        else res.status(200).send("Data updated successfully!")
    })
})

app.get('/donordata',(req,res)=>{
    conn.query("select d_id,fname, lname, bloodgroup, gender, phone, email, states.state, cities.city from donors left join states on donors.stateid = states.s_id left join cities on donors.cityid = cities.c_id",function(err,result){
        if(err) throw err
        else res.send(result)
    })
})

app.get('/requestblood',(req,res)=>{
    conn.query("select r_id,pname, hname, bloodgroup, phone, email, urgency, units, request_blood.status, states.state, cities.city from request_blood left join states on request_blood.state = states.s_id left join cities on request_blood.city = cities.c_id",function(err,result){
        if(err) throw err
        else res.send(result)
    })
})

app.get('/recentactivity',(req,res)=>{
    conn.query("select CONCAT(fname,' ',lname) AS name,bloodgroup,status,last_updated,DATE_FORMAT(last_updated, '%d-%M-%Y') as date from donors UNION ALL select pname AS name,bloodgroup,status,last_updated,DATE_FORMAT(last_updated, '%d-%M-%Y') as date from request_blood order by last_updated desc LIMIT 10", function(err,result){
        if(err) throw err
        else res.send(result)
    })
})

app.post('/donorhistory',(req,res)=>{
    const history = req.body
    conn.query("insert into donation_history (d_id,hospital,bloodgroup,state,city,remarks) values (?,?,?,?,?,?)",[history.donor,history.hospital,history.bloodgroup,history.state,history.city,history.remarks],function(err){
        if(err) throw err
        else res.json({success:'true'})
    })
    conn.query("insert into blood_stock (bloodgroup,units) values (?,1) on duplicate key update units = units + 1",[history.bloodgroup],function(err2){
        if(err2) throw err2
        else console.log({success:'true'})
    })
})

app.get('/matchdonor/:value',(req,res)=>{
    const user = req.params.value
    conn.query("select fname,email,lname from donors inner join donation_history on donors.d_id = donation_history.d_id where email=? LIMIT 1",[user],function(err,result){
        if(err) throw err
        else res.send(result)
    })
})

app.get('/optimisedDonors',(req,res)=>{
    conn.query("select donors.d_id, donors.fname, donors.lname, donors.bloodgroup, donors.gender from donors left join (select d_id,max(last_updated) AS last_donation from donation_history group by d_id) donation_history on donors.d_id = donation_history.d_id where donation_history.last_donation IS NULL OR donation_history.last_donation <= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)",function(err,result){
        if(err) throw err
        else res.send(result)
    })
})

app.get('/bloodstock',(req,res)=>{
    conn.query("select * from blood_stock",function(err,result){
        if(err) throw err
        else res.send(result)
    })
})

app.post('/fulfillrequest', (req, res) => {
    const { id, bloodgroup, units } = req.body;
  
    conn.query("SELECT units FROM blood_stock WHERE bloodgroup = ?", [bloodgroup], function (err, result) {
      if (err) return res.status(500).json({ error: "Database error on stock check" });
  
      if (result.length === 0) return res.status(404).json({ error: "Blood group not found in stock" });
  
      const availableUnits = result[0].units;
      if (availableUnits < units) {
        return res.status(400).json({ error: "Not enough blood units available" });
      }
  
      conn.query("UPDATE blood_stock SET units = units - ? , status = 'request fulfilled' WHERE bloodgroup = ?", [units, bloodgroup], function (err2, result2) {
        if (err2) return res.status(500).json({ error: "Failed to update stock" });
  
        conn.query(
          "UPDATE request_blood SET status = 'Fulfilled' WHERE r_id = ?",
          [id],
          function (err3, result3) {
            if (err3) return res.status(500).json({ error: "Failed to update request status" });
            return res.json({ message: "Request fulfilled and stock updated" });
          }
        );
      });
    });
  });
  
app.post('/recipientvalidation',(req,res)=>{
    const pdata = req.body
    conn.query("select * from request_blood where phone = ?",[pdata.phone],function(err,result){
        if(err) throw err
        
        if(result.length > 0){
            const token = jwt.sign({username: pdata.phone},key)
            res.json({success:true,token})
        }else{
            res.json({success:false})
        }
    })
})

app.get('/recipienttracking/:phone',jwtAuth,(req,res)=>{
    const phone = req.params.phone
    conn.query("select r_id,pname, hname, bloodgroup, phone, email, urgency, units, request_blood.status, states.state, cities.city from request_blood left join states on request_blood.state = states.s_id left join cities on request_blood.city = cities.c_id where phone = ?",[phone],function(err,result){
        if(err) throw err
        else res.send(result)
    })
})

app.get('/donationHistory',(req,res)=>{
    conn.query("select dh_id, hospital, donation_history.bloodgroup, DATE_FORMAT(donation_history.last_updated, '%d-%M-%Y') AS status, CONCAT(fname,' ',lname) AS name, states.state, cities.city from donation_history left join donors on donation_history.d_id = donors.d_id left join states on donation_history.state = states.s_id left join cities on donation_history.city = cities.c_id",function(err,result){
        if(err) throw err
        else res.send(result)
    })
})

app.listen(port,()=>{
    console.log("working");
})  

