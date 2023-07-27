const router = require('express').Router();
const { User, Blog } = require('../../models');

// create user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log('Post route SIGN-UP used')
    res.status(400).json(err);
  }
});

// login existing user
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      console.log('USERDATA', userData)
      res
        .status(400)
        .json({ message: 'Incorrect username, please try again' });
      return;
    }
    console.log(userData)

    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      console.log('USERDATA', userData)
      console.log(validPassword)
      res
        .status(400)
        .json({ message: 'Incorrect password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      attributes: ['username'],
      include: {
        model: Blog,
        attributes: [
          'title',
        ],
      },
    });
    if (!userData) {
      res.status(404).json({ message: 'There is no User with that ID' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// 

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    console.log('Logout Successful!')
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});



module.exports = router;
