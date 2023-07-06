// const { Hash } = require("crypto");
const { createHmac, randomBytes } = require("crypto");
const mongoose = require("mongoose");
var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const newSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    requierd: true,
  },
  emailId: {
    type: String,
    required: true,
    // validate: [validateEmail, 'Please fill a valid email address'],
  },
});

newSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt).update(user.password).digest("hex");
  this.salt=salt
  this.password = hashedPassword;
  next();
});

const User = new mongoose.model("user", newSchema);

module.exports = User;
