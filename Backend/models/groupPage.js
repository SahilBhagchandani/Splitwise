const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let groupSchema = new Schema(
  {
    groupname: {
      type: String,
      required: true,
    },
    created_by:{
        type: String
    },

    created_time: {
      type: Date,
      default: Date.now,
    },

    members: [{ type: String, ref: "User" }],
    inviteMembers: [{ type: String, ref: "User" }],
  },
  {
    timestamps: true,
    collection: "groups",
  }
);
module.exports = mongoose.model("group", groupSchema);
