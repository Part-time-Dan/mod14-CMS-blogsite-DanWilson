const { Comment } = require('../models');

const commentContent = [
    {
      "description": "Seed comment 1",
      "date_created": "7/13/2023",
      "user_id": 1,
      "blog_id": 1,
    },
    {
      "description": "Seed comment 2",
      "date_created": "7/1/2023",
      "user_id": 2,
      "blog_id": 1,
    },
    {
      "description": "Seed comment 3",
      "date_created": "6/30/2023",
      "user_id": 3,
      "blog_id": 1,
    }
]

const commentData = () => Comment.bulkCreate(commentContent);

module.exports = commentData;
