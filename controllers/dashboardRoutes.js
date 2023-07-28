const router = require('express').Router();
const { Blog, User, Comment } = require('../models');

router.get('/', (req, res) => {
  if (!req.session.logged_in) {
    // If the user is not logged in, redirect to the 'choice' page
    return res.redirect('/choice');
  }
  // If the user is logged in, render the dashboard template
  Blog.findAll({
    where: { user_id: req.session.user_id },
    attributes: ['id', 'title', 'description', 'date_created'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'description', 'blog_id', 'user_id', 'date_created'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((blogData) => {
      const blogs = blogData.map((blog) => blog.get({ plain: true }));
      res.render('dashboard', { blogs, logged_in: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;
