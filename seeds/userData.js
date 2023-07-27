const { User } = require('../models');

const userLogin = 
[
  {
    "username": "Chris",
    "email": "redfield@hotmail.com",
    "password": "password12345"
  },
  {
    "username": "Sheva",
    "email": "alomar@gmail.com",
    "password": "password12345"
  },
  {
    "username": "Jill",
    "email": "valentine@aol.com",
    "password": "password12345"
  }
]

const userData = () => User.bulkCreate(userLogin, {
    individualHooks: true,
    returning: true,
});


module.exports = userData;
