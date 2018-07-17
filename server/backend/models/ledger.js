const mongoose = require("mongoose");

const ledgerSchema = mongoose.Schema({
  entry_date: {
    type: Date,
    required: true
  },
  debit_credit: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type: String
  },
  subcategory: {
    type: String
  },  
  amount: {
    type: Number,
    default: 0
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  updated_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true } );

const Ledger = mongoose.model("Ledger", ledgerSchema);

module.exports = { Ledger };