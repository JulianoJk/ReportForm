const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    site: { type: String, required: true },
  },
  { collection: "users" }
);

const model = mongoose.model("User", UserSchema);

module.exports = model;
