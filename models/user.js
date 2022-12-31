/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = new mongoose.Schema({
  username: {
  type: String,
  lowercase: true,
  unique: true,
  required: [true, "can't be blank"],
  match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
  index: true,
  },
  password: { type: String, required: true },
  email: {
    type: String,
    unique:true,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true,
    validated: { type: Boolean, default: true },
  },
}, {
  timestamps: true,
});

User.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


User.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

User.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, username: this.username },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    },
  );
};

module.exports = mongoose.model('User', User);
