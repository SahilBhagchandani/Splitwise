const User = require('../models/users');
const Group = require('../models/groupPage')
const Bill = require('../models/bill');


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
   inviteMembers: result
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
   let groupnamearray = [];

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
   
   
   Group.find({
      $expr: {
        $in: [useremail, "$inviteMembers"]
      }
    }).then( group =>{
      if(!group){

         console.log("1");
         console.log(group);
   

      }else{

         console.log("2")
         console.log(group)
         for(i=0 ; i< group.length ; i++){
            console.log(group[i].groupname);
            groupnamearray.push(group[i].groupname);

         }
         console.log(groupnamearray);
         res.send(group);
         // res.status(200).json({
         //    success: true,
         //    result: groupnamearray
         // })

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

exports.inviteaccepted= (req, res) =>{
   let useremail = req.body.user
   let userID = req.body.objectid
   console.log(useremail)
   console.log(userID)

//    Group.findByIdAndUpdate(userID,
//       {$pull: {'inviteMembers': useremail}}
//   )

  Group.findOneAndUpdate( 
     {'_id' : userID} ,
  {
    $pull: {'inviteMembers': useremail }
  }
  , function(error, result){
     if(error){

      // console.log(error)
     }
     else{

      console.log("cdkcnd: ",result.groupname);
      User.findOneAndUpdate( 
         {'email' : useremail} ,
      {
        $push: {'groupPartOf': result.groupname}
      }
      , function(err, re){
         if(error){
    
         //  console.log(err)
         }
         else{
    
          console.log("hello")
    
         }
      }
      )







      Group.findOneAndUpdate( 
         {'_id' : userID} ,
      {
        $push: {'members': useremail }
      }
      , function(err, re){
         if(error){
    
         //  console.log(err)
         }
         else{
    
         //  console.log(res)
    
         }
      }
      )

     }
  }
  )
}

exports.invitedeclined= (req, res) =>{
   let useremail = req.body.user
   let userID = req.body.objectid
   console.log(useremail)
   console.log(userID)

//    Group.findByIdAndUpdate(userID,
//       {$pull: {'inviteMembers': useremail}}
//   )

  Group.findOneAndUpdate( 
     {'_id' : userID} ,
  {
    $pull: {'inviteMembers': useremail }
  }
  , function(error, result){
     if(error){

      console.log(error)
     }
     else{

     
     }
  }
  )
}

exports.grouppartof= (req, res) =>{
   let user = req.body.useremail
   console.log("jjj: ", user)
   User.find({email: user}, function(err, users) { 

      // var userMap = {}; 
      // console.log("this is: ",users)
      
      // users.forEach(function(user) { 
      
      // userMap[user.email] = user
      
      // }); 
      // console.log(userMap)
      res.send(users); 
      
      
      }); 
}

exports.billdetails =(req, res)=>{
   let groupname = req.body.groupname
   let billDesc =  req.body.expensedescription
   let amount = req.body.amount
   let email = req.body.email
   console.log(groupname,", ", billDesc, ",", amount, email)

   const bill= new Bill({
      bill_desc: billDesc,
      created_in: groupname,
      bill_amount: amount,
      created_by: email
   })
   bill.save()
   .then(response => {
      res.status(200).json({
        success: true,
        result: response
      })
   })


}

exports.getbilldetails= (req, res)=>{
   let groupname = req.body.groupname

   Bill.find({created_in: groupname}, function(error, results){
      if(error){
         console.log(error)
      }
      else{
         console.log(results)
         res.send(results)
      }

   });

}

exports.groupmembers= (req, res)=>{
   let groupname = req.body.groupname
   
   Group.find({groupname: groupname}, function(error, results){
      if(error){
         console.log(error)
      }else{
         res.send(results)
         console.log("helloccc")
      }

   });
   
}

exports.youareowed =(req, res)=>{
   let email = req.body.email;
   let billgroup = [];
   var splitbill= 0;
   let splitbillList = []
   var totalbill = 0;
   console.log("gbgbgb", email);
   var list= []

   Bill.find({created_by: email}, function(error, results){
      if(error){
         console.log(error)
      }else{
         console.log("ckii,", results.length)
         // console.log("yoloo: ", results[2].created_in)
         // console.log("kkyudc: ", results[2].bill_amount)
         var length= results.length-1

         for(let i =0; i< results.length; i++){
            Group.find({groupname: results[i].created_in}, function(error, groupresults){
               if(error){
                  console.log(error)
               }else{
                  console.log(groupresults)
                  console.log("fu",groupresults[0].members.length)
                  billgroup = groupresults[0].members
                  let newarray = billgroup.filter(element => element !== email);

                  console.log("ck",billgroup)
                  console.log("cc", newarray)

                  console.log("helloccc")
                  splitbill = results[i].bill_amount/groupresults[0].members.length
                  totalbill += splitbill;
                  console.log("split:", splitbill)
                  splitbillList= splitbillList.concat(splitbill)
                  var finaldata2 ={
                     moneyowe: splitbill,
                     members: newarray,
                     groupname : results[i].created_in,
                     billdesc: results[i].bill_desc,
                     totalbill: totalbill
                  }
                  list.push(finaldata2)
                  
                  if(i == length){
                     console.log("final3", list)
                     res.send(list)
                    

                  }
                  


               }

         
            });

            

         }
         console.log("final1",list)
         
         
      }
      console.log("final2",list)

   });

  
   // Group.find({
   //    $expr: {
   //      $in: [useremail, "Members"]
   //    }, function(error, results){
   //       if(error){
   //          console.log(error)
   //       }else{
   //          res.send(results)
   //          console.log("helloccc")
   //       }
   
   //    }
   //  });

}

