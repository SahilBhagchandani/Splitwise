const User = require('../models/users');
const Group = require('../models/groupPage')


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

exports.creategroup = (req, res) =>{
   // let groupmemberemails = [];
   let groupmemberemails =  req.body.groupmemberemails[0];
   let groupname = req.body.groupname;
   let usercreated = req.body.usercreated;

   

   console.log("groupmember emails:", groupmemberemails)
   console.log("group name:", groupname)

   var result= [];

   for (var i = 0; i < groupmemberemails.length; i++) {
      result[i] = groupmemberemails[i].value
  }
  result.push(req.params.useremail)
  console.log(result)

  const group = new Group({
   groupname: groupname,
   created_by: usercreated,
   members: result
})


//   for (let i = 0; i < result.length; i++) {
      
//    }
   group.save()
   .then(response => {
      res.status(200).json({
        success: true,
        result: response
      })
   })
   .catch(err => {
      console.log("here")
     res.status(500).json({
        errors: [{ error: err }]
        
     });
  });

//   const user = new User({
//      groupInvitedTo: groupname

//   })

//   user.save()
//    .then(response => {
//       res.status(200).json({
//         success: true,
//         result: response
//       })
//    })
//    .catch(err => {
//       console.log("here 2")
//      res.status(500).json({
//         errors: [{ error: err }]
//      });
//   });


}

exports.getuserlist = (req, res) =>{
   User.find({}, function(err, users) { 

      var userMap = {}; 
      console.log("this is: ",users)
      
      users.forEach(function(user) { 
      
      userMap[user.email] = user
      
      }); 
      console.log(userMap)
      res.send(users); 
      
      
      }); 

}

exports.getinvitation= (req, res) =>{

   let useremail =  req.body.user;
   console.log("em: ", useremail)

   // Group.find(
   //    { inviteMembers: { $elemMatch : [useremail]}},
   //    inviteMembers: { $elemMatch : [useremail]}}).then(Group =>
   //       {

   //       })


      // Group.findOne({"friends.email": email}, 
      //        {projection: { friends: { $elemMatch: { email: email } } } },
      //        function(errT, resultT) {...});
   

   // Group.find({$elemmatch:{"members": useremail }})
   
   // Group.find().in("members", useremail)
   
   
   Group.findOne({
      $expr: {
        $in: [useremail, "$members"]
      }
    }).then( group =>{
      if(!group){

         console.log("1")
   

      }else{

         console.log("2")

      }
   })


   // Group.find({use:useremail}).then( group =>{
   //    if(!group){
   //       console.log("1")

   //    }else{
   //       console.log("2")

   //    }
   // })


}

