const sequelize = require('../config/connection');

const userData = require('./userData');
const blogData = require('./blogData');
const commentData = require('./commentData')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await userData();

  await blogData();

  await commentData();

  process.exit(0);
};

seedDatabase();
