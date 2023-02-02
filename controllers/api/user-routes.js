const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.username = dbUserData.username;
      req.session.email = dbUserData.email;
      req.session.user_id = dbUserData.id

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.username = dbUserData.username;
      req.session.email = dbUserData.email;
      req.session.user_id = dbUserData.id

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Update
router.put('/update-user/:id', async (req, res) => {
  console.log(req.session)
  try {
    if (req.session.loggedIn) {

      const dbUserData = await User.findOne({
        where: {
          id: req.session.user_id,
        },
      });

      if (!dbUserData) {
        res
          .status(400)
          .json({ message: 'Incorrect user info. Please try again!' });
        return;
      }

      const validPassword = await dbUserData.checkPassword(req.body.oldPassword);

      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
      const newDbUserData = await User.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      if (newDbUserData) {
        req.session.save(() => {
          req.session.loggedIn = true;
          req.session.username = dbUserData.username;
          req.session.email = dbUserData.email;
          req.session.user_id = dbUserData.id
    
          res
            .status(200)
            .json({ user: dbUserData, message: 'You have updated your profile!' })
            .end();
        });
      } else {
        res.status(404).end();
      }
    } else {
      res.redirect('/login')
    }
  } catch (err) {
    res.status(500).json(err);
  }
})
module.exports = router;
