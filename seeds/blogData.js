const { Blog } = require('../models');

const blogContent = [
    {
      "title": "Things I Blog",
      "description": "I blog about coding.",
      "date_created": "7/13/2023",
      "user_id": 1,
    },
    {
      "title": "Daily Exercise",
      "description": "Try codewars, leetcode or hackerrank!",
      "date_created": "7/1/2023",
      "user_id": 2,
    },
    {
      "title": "Update",
      "description": "Still blogging!",
      "date_created": "6/30/2023",
      "user_id": 3,
    }
]

const blogData = () => Blog.bulkCreate(blogContent);

module.exports = blogData;