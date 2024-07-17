const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter user name"],
  },
  email: {
    type: String,
    required: [true, "Please enter user email"],
  },
  age: {
    type: Number,
    default: 0,
  },
  queueNumber: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  date: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
})

UserSchema.index({ name: 1 });

const User = mongoose.model("User", UserSchema)

module.exports = User
