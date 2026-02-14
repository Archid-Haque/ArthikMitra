const bcrypt = require("bcryptjs");

// Demo users (temporary database)
const users = [
  {
    id: 1,
    role: "student",
    email: "student@demo.com",
    password: bcrypt.hashSync("123456", 10)
  },
  {
    id: 2,
    role: "teacher",
    email: "teacher@demo.com",
    password: bcrypt.hashSync("123456", 10)
  }
];

module.exports = users;
