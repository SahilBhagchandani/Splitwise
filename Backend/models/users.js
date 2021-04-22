const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let userSchema = new Schema({
   name:{
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   phonenumber: {
      type: Number,
      required: false,
      default: null
   },
   currency: {
      type: String,
      required: false,
      default: "USD",
   },
   language: {
      type: String,
      default: "English"
   },
   profileImg: {
      type: String
   },

   groupPartOf: [{type: String, ref: "Groups"}],
   groupInvitedTo: [{type: String, ref: "Groups"}]
},{
   timestamps: true,
   collection: 'users'
})
module.exports = mongoose.model('users', userSchema);