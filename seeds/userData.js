const { User } = require('../models');

const blogContent = [
  {
    "name": "Chris",
    "email": "redfield@hotmail.com",
    "password": "password12345"
  },
  {
    "name": "Sheva",
    "email": "alomar@gmail.com",
    "password": "password12345"
  },
  {
    "name": "Jill",
    "email": "valentine@aol.com",
    "password": "password12345"
  }
]

const userData = () => User.bulkCreate(blogContent);

module.exports = userData;