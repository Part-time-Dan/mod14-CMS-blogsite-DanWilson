const router = require('express').Router();
const { Blog, User, Comment } = require('../models');

router.get('/', async (req, res) => {
  try {
    // Get all blogs and render on homepage without Auth
    const blogData = await Blog.findAll({
      attributes: [ 'id', 'title', 'date_created', 'description'],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ],
      order: [['date_created', 'DESC']],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// 

router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      attributes: ['id', 'title', 'description'],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    // add if statement in case blog data is null?

    const blog = blogData.get({ plain: true });

    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// 

// Route for the login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    // If the user is already logged in, redirect to the 'dashboard' page
    return res.redirect('/dashboard');
  }
  res.render('login');
});

// Route for the signup page
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    return res.redirect('/dashboard');
  }
  res.render('signup');
});

// Route for the 'choice' page
router.get('/choice', (req, res) => {
  res.render('choice');
});

module.exports = router;
