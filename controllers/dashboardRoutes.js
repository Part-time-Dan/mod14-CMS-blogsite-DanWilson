const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  // Get all books from the book table
  Blog.findAll().then((blogData) => {
    const blogs = blogData.map(blog => blog.get({ plain: true}));
    res.render('dashboard', blogs);
  });
});
  
  module.exports = router;