//import the require dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var bcrypt = require("bcrypt")
var mysql = require('mysql')
var mongoose = require('mongoose')
const authRoutes = require('./router/auth');
app.set("view engine", "ejs");

//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

//use express session to maintain session data
app.use(
  session({
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000,
  })
);
app.use('/api', authRoutes);
//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");

const URI = "mongodb+srv://admin:admin@cluster0.ucmd1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const connectDB = () =>{
  mongoose.connect(URI,{useUnifiedTopology: true, useNewUrlParser: true});
  console.log('db connected');
};
connectDB();


// var con = mysql.createConnection({
//     host: "splitwise.c1wrg2zvrdc1.us-east-2.rds.amazonaws.com",
//     port: "3306",
//     user: "admin",
//     password: "Sahil12345",
//     database: "splitwise",
//     connectionLimit: 1
// })

// con.connect(function(err){
//   if (err) throw err

//   console.log("Connection Successfull");

// });

// app.get('/',(req, res)=>{
//   res.json('OK');
// })

// app.post('/signup', (req, res)=>{
//   var fullname = req.body.fullName;
//   var email = req.body.email;
//   var password = req.body.password;
//   var salt = bcrypt.genSaltSync(10);
//   var encryptedpassword = bcrypt.hashSync(password, salt);
//   console.log("inside signup")
//     con.query("INSERT INTO user_table(name, email, password) VALUES (?,?,?)",[fullname, email, password], function(err, res, fields){
//       if (err) throw err;
//       // res.cookie("cookie", "admin", {
//       //   maxAge: 750000,
//       //   httpOnly: false,
//       //   path: "/",
    
//       // });
  
      
//       console.log(res);
//     });

//   res.json("form received");
// })



// // app.use(bodyParser.urlencoded({
// //     extended: true
// //   }));
// app.use(bodyParser.json());

// //Allow Access Control
// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,OPTIONS,POST,PUT,DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
//   );
//   res.setHeader("Cache-Control", "no-cache");
//   next();
// });

// var Users = [
//   {
//     username: "admin",
//     password: "admin",
//   },
// ];



//Route to handle Post Request Call
// app.post("/login", function (req, res) {

//   console.log("Inside Login Post Request");
//   //console.log("Req Body : ", username + "password : ",password);

//   var email= req.body.email;
//   var password = req.body.password;
//   console.log(email)
//   console.log(password)
//   con.query("SELECT * FROM user_table WHERE email = (?) AND password =(?)",[email,password], (error, results)=> {
//     if (error) {
//       res.send({
//         "code":400,
//         "failed":"error ocurred"
//       })
//     }else{
//       if(results.length >0){
//         console.log("login successful");
//           res.cookie("cookie", "admin", {
//             maxAge: 750000,
//             httpOnly: false,
//             path: "/",
        
//           });
//           console.log("Cookie created");
//             //  req.session.user = user;
//          res.writeHead(200, {
//            "Content-Type": "application/json",
//          });
//           res.end();
//       //   const comparision = bcrypt.compare(password, results[0].password)
//       //   if(comparision){
//       //     res.send({
//       //       "code":200,
//       //       "success":"login sucessfull"
//       //     })
//       //     console.log("login succesgul");
//       //     res.cookie("cookie", "admin", {
//       //       maxAge: 750000,
//       //       httpOnly: false,
//       //       path: "/",
        
//       //     });
//       //     console.log("Cookie created");
//       //       //  req.session.user = user;
//       //    res.writeHead(200, {
//       //      "Content-Type": "application/json",
//       //    });
//       //     res.end();

//       //   }
//       //   else{
//       //     res.send({
//       //          "code":204,
//       //          "success":"Email and password does not match"
//       //     })
//       //   }
//       }
//       else{
//         console.log("unsuccesfull")
//         res.send({
//           "code":206,
//           "success":"Email does not exits"
//             });
//       }
//     }
//     });
//   console.log("Req Body : ", req.body);
//   // Users.filter(function (user) {
//   //   if (
//   //     user.username === req.body.email &&
//   //     user.password === req.body.password
//   //   ) {
//   //     res.cookie("cookie", "admin", {
//   //       maxAge: 750000,
//   //       httpOnly: false,
//   //       path: "/",
//   //     });
//   //     req.session.user = user;
//   //     res.writeHead(200, {
//   //       "Content-Type": "application/json",
//   //     });
//   //     res.end();
//   //   } else {
//   //     res.writeHead(400, {
//   //       "Content-Type": "application/json",
//   //     });
//   //     res.end();
//   //   }
//   // });
// });

// //Route to get All Books when user visits the Home Page
// app.get("/home", function (req, res) {
//   console.log("Inside Home Login");
//   res.writeHead(200, {
//     "Content-Type": "application/json",
//   });
//   // console.log("Books : ", JSON.stringify(books));
//   // res.end(JSON.stringify(books));
// });


// app.get('/getuserlist/:useremail', function (req, res) {
//   console.log("Inside get email id list")
//   con.query("SELECT DISTINCT(email) FROM user_table where email NOT IN (?)", [req.params.useremail], (err, result) => {
//       if (err) {
//           res.writeHead(400, {'Content-Type': 'text/plain'})
//           res.end("Could Not Get Connection Object");
//       } else {
//           res.writeHead(200, {'Content-Type': 'application/json'})
//           // console.log(JSON.stringify(result))
//           res.end(JSON.stringify(result));
//       }
//   })
// })

// app.post('/creategroup/:useremail', function (req, res) {

//   console.log("Inside Create Group Post Request");
//   groupmemberemails = req.body.groupmemberemails[0]
//   groupname = req.body.groupname
//   console.log(groupname)
//   // console.log(groupmemberemails)
//   var result = []
//   for (var i = 0; i < groupmemberemails.length; i++) {
//       result[i] = groupmemberemails[i].value
//   }
//   result.push(req.params.useremail)
//   console.log(result)

//   for (let i = 0; i < result.length; i++) {
//       console.log("Inside loop")
//       con.query("INSERT INTO usergroup (`email`,`group_name`) VALUES (?,?)", [
//           result[i], groupname] ,(err, result) => {
//           if(err)
//           console.log(err);
//      });
  
// }

// //res.status(200).json({message: "users added in group Successful"});
// con.query("INSERT INTO groupinfo (`group_name`) VALUES (?)",[groupname],(err, result) => {
//   if(err)
//   console.log(err);
// });
// res.status(200).json({message: "users added in group_table and user_group Successful"});
// })

// app.get('/usergroup/:useremail', function (req, res) {
//   console.log("Get user groups name")
//   con.query("SELECT DISTINCT(group_name) FROM usergroup", (err, result) => {
//       if (err) {
//           res.writeHead(400, {'Content-Type': 'text/plain'})
//           res.end("Could Not Get Connection Object");
//       } else {
//           res.writeHead(200, {'Content-Type': 'application/json'})
//           // console.log(JSON.stringify(result))
//           res.end(JSON.stringify(result));
//       }
//   })
// })

// app.get('/GroupPage/:groupname', function (req, res) {
//   console.log("Get user names")
//   // groupname= req.body.groupname
//   console.log(req.params.groupname)

//   con.query("SELECT email FROM usergroup WHERE group_name= (?) AND email NOT IN ('null')",[req.params.groupname], (err, result) => {
//       if (err) {
//           res.writeHead(400, {'Content-Type': 'text/plain'})
//           res.end("Could Not Get Connection Object");
//       } else {
//           res.writeHead(200, {'Content-Type': 'application/json'})
//           // console.log(JSON.stringify(result))
//           res.end(JSON.stringify(result));
//       }
//   })
// })

// app.post('/billdetails', function (req, res) {
//   var billdescription = req.body.expensedescription
//   var amount = req.body.amount
//   var groupname = req.body.groupname

//   console.log(billdescription)
//   console.log(amount)
//   console.log(groupname)
//   console.log("Inserting bill details")
//   con.query("INSERT INTO bill(`group_name`,`total_amount`, `description`) VALUES (?,?,?)",[groupname,amount,billdescription], (err, result) => {
//       if (err) {
//           res.writeHead(400, {'Content-Type': 'text/plain'})
//           res.end("Could Not Get Connection Object");
//           console.log(err)
//       } else {
//           res.writeHead(200, {'Content-Type': 'application/json'})
//           // console.log(JSON.stringify(result))
//           res.end(JSON.stringify(result));
//       }
//   })
// })

// app.post('/getbilldetails', function (req, res) {
//   var groupname = req.body.groupname
//   console.log(groupname)
//   console.log("Get bill details")
//   con.query("SELECT description, total_amount FROM bill WHERE group_name = (?)",[groupname], (err, result) => {
//       if (err) {
//           res.writeHead(400, {'Content-Type': 'text/plain'})
//           res.end("Could Not Get Connection Object");
//       } else {
//           res.writeHead(200, {'Content-Type': 'application/json'})
//           // console.log(JSON.stringify(result))
//           res.end(JSON.stringify(result));
//       }
//   })
// })


