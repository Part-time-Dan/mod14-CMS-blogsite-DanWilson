const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all blogs and render on homepage without Auth
    const blogData = await Blog.findAll({
      attributes: [ 'id', 'title', 'date_created'],
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

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is new, redirect the request to signup
  res.render('signup');
});

// 

// redirect user not logged in
router.get('/dashboard', (req, res) => {
  // If the user is not logged in, render the dashboard choice page
  if (!req.session.logged_in) {
    return res.render('choice');
  }
  // If the user is logged in, render the actual dashboard page
  return res.render('dashboard', { logged_in: true });
});

// 

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;