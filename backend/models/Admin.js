import mongoose from "mongoose";

const Admin = mongoose.model("Admin", {
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default Admin;
