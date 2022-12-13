const mongoose = require("mongoose");

const SignInSchema = new mongoose.Schema(
  {
    user_name:"string",
    user_email: "string",
    user_password:"string",
    get_code: "string",
    accountN: "string",
    status: "string",
    loginstatus:Boolean,
    accountB: Number,
    transactions:[],
    
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

const SignIn = mongoose.model("SignIn", SignInSchema);

module.exports = {
  SignIn,
};