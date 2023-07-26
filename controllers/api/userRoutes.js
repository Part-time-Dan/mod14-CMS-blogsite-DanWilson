const router = require('express').Router();
const { User, Blog } = require('../../models');

// create user
// router.post('/', async (req, res) => {
//   try {
//     const userData = await User.create({
//       name: req.body.name,
//       password: req.body.password,
//     });

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.name = userData.name;
//       req.session.logged_in = true;

//       res.status(200).json(userData);
//     });
//   } catch (err) {
//     console.log('Post route js4 used')
//     res.status(400).json(err);
//   }
// });

// login existing user
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { user: req.body.name } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    console.log('post route js25 used')
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});



module.exports = router;
