const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createJWT } = require("../utils/auth");

var secret = "cmpelab2";
exports.signup = (req, res, next) => {
  let { name, email, password } = req.body;
  User.findOne({email: email})
   .then(user=>{
      if(user){
         return res.status(422).json({ errors: [{ user: "email already exists" }] });
      }else {
         const user = new User({
           name: name,
           email: email,
           password: password,
         });
         console.log("inside signup");
         bcrypt.genSalt(10, function(err, salt) { bcrypt.hash(password, salt, function(err, hash) {
         if (err) throw err;
         user.password = hash;
         user.save()
             .then(response => {
                res.status(200).json({
                  success: true,
                  result: response
                })
             })
             .catch(err => {
               res.status(500).json({
                  errors: [{ error: err }]
               });
            });
         });
      });
     }
  }).catch(err =>{
      res.status(500).json({
        errors: [{ error: 'Something went wrong' }]
      });
  })
}
exports.login = (req, res) => {
     let { email, password } = req.body;
     User.findOne({ email: email }).then(user => {
       if (!user) {
         return res.status(404).json({
           errors: [{ user: "not found" }],
         });
       } else {
          console.log("found user", user.email," password :", user.password)
          bcrypt.compare(req.body.password, user.password).then(isMatch => {
             if (!isMatch) {
              return res.status(400).json({ errors: [{ password:
"incorrect" }] 
              });
             }
             console.log("enter here", secret);
               let access_token = createJWT(
                     user.email,
                     user._id,
                     3600
                  );

               
                  // const payload = { _id: user._id, username: user.username};
                  // const access_token = jwt.sign(payload, secret, {
                  //       expiresIn: 1008000
                  //    });



               console.log("enter here 2");
       jwt.verify(access_token, secret, (err,
decoded) => {
         if (err) {
            res.status(500).json({ erros: err });
            console.log("error here 1")
         }
         if (decoded) {
             return res.status(200).json({
                success: true,
                token: access_token,
                message: user
             });
           }
         });
        }).catch(err => {
          res.status(500).json({ erros: err });
          console.log("error here 2");
        });
      }
   }).catch(err => {
      res.status(500).json({ erros: err });
      console.log("error here 3");
   });
}