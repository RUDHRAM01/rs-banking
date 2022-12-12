const mongoose = require("mongoose");

const TransactionInSchema = new mongoose.Schema(
  {
    transaction:"string",
    date: "string",
    amount:"Number",

    createDate: "date",
    updatedDate: "date",
    createdBy: "string",
    updatedBy: "string",
  
    archive: {
      type: Boolean,
      default: false
  }

  },
  { timestamps: { createDate: "created_at", updatedDate: "updated_at" } }
);

const TransactionIn = mongoose.model("TransactionIn", TransactionInSchema);

module.exports = {
  TransactionIn,
};