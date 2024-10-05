import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
},{timestamps:true}
);

userSchema.methods.matchPassword = async function(enteredPassword) {
  return bcrypt.compare(enteredPassword,this.password)
};

const USER_SCHEMA = mongoose.model("users", userSchema);

export default USER_SCHEMA;
