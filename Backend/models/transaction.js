const mongoose = require("mongoose");

const transactionSchema =new mongoose.Schema({
    sender:{
        type: String,
        required: true
    },
    receiver:{
        type: String,
        required: true
    },
    transaction_in:{
        type: String
    },
    transaction_amount:{
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("transaction", transactionSchema);