const express = require('express');
const router = express.Router();


const multer=require("multer")
const upload = multer({ dest: "uploads/" });
const User = require("../models/users");
const fs = require('fs');
var util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const {uploadFile,getFileStream} = require("../services/file-upload")


const { signup, login, creategroup, getuserlist, getinvitation, inviteaccepted, invitedeclined, grouppartof, billdetails, getbilldetails, groupmembers, youareowed } = require('../controller/auth');
// const { imageupload }= require('../controller/auth');



router.post('/signup', signup);
router.post('/login', login);
router.post('/creategroup', creategroup );
router.get('/getuserlist', getuserlist);
router.post('/getInvitation', getinvitation);
router.post('/inviteaccepted', inviteaccepted);
router.post('/invitedeclined', invitedeclined);
router.post('/grouplist', grouppartof);
router.post('/billdetails', billdetails);
router.post('/getbilldetails', getbilldetails);
router.post('/groupmembers', groupmembers);
router.post('/youareowed', youareowed);
// router.get('/imageupload', imageupload)


router.post("/imageupload", upload.single("file"), async function (req, res) {
    try{
      console.log("Inside API")
      console.log(req.file)
    const file = req.file;

    const useremail=req.body.useremail
    console.log(useremail)
    console.log(file.path)
    console.log(file);
    console.log("userdd: ",useremail)
  
    // apply filter
    // resize
  
    const result = await uploadFile(file);
   
    await unlinkFile(file.path);
    console.log("Hello")
    console.log(result);
    console.log(result.Location)
   
    await User.updateOne({"email":useremail},{$set:{"profileImg":result.Location}})
   
   
    console.log("I am here")
     res.status(200).json({message: "Picture uploaded successfully"});
    }
  catch (error)
  {
       res.writeHead(400, {'Content-Type': 'text/plain'})
  }
   
  });
  
  
  router.post("/getimage", async function (req, res) {
    try{
      console.log("Inside Get Image API")
      const useremail=req.body.useremail
      console.log(useremail)
      const userimage= await User.find({email:useremail},{profileImg:1});
      console.log("cdcd: ", userimage);
  
      res.status(200).json({imagelink: userimage});
  }catch (error)
  {
      res.writeHead(400, {'Content-Type': 'text/plain'})
  }
  });
  
  
  router.post("/getimageonload", async function (req, res) {
    try{
      console.log("Inside Get Image onload API")
      const useremail=req.body.useremail
      console.log(useremail)
      const userimage= await User.find({email:useremail},{profileImg:1});

      console.log("cdcd: ", userimage);
  
      res.status(200).json({imagelink: userimage});
  }catch (error)
  {
      res.writeHead(400, {'Content-Type': 'text/plain'})
  }
  });
   
  
   
   

module.exports = router;