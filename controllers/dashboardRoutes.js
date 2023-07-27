const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// show user their own posts
router.get('/', withAuth, (req, res) => {
    Blog.findAll({where: {user_id: req.session.user_id},
      attributes: ['id','title','description','date_created'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'description', 'blog_id', 'user_id', 'date_created'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ],
    })
    .then(blogData => {
      const blogs = blogData.map(blog => blog.get({ plain: true }));
      res.render('dashboard', { blogs, logged_in: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



module.exports = router;