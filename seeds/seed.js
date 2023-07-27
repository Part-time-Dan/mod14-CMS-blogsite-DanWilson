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

// const sequelize = require('../config/connection');
// const { User, Project } = require('../models');

// const userData = require('./userData');
// const projectData = require('./projectData.json');

// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });

  // const users = await User.bulkCreate(userData, {
  //   individualHooks: true,
  //   returning: true,
  // });

//   for (const project of projectData) {
//     await Project.create({
//       ...project,
//       user_id: users[Math.floor(Math.random() * users.length)].id,
//     });
//   }

//   process.exit(0);
// };

// seedDatabase();