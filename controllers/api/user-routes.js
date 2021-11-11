const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Comment, Post, User, Vote } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to get all users
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
  })
  .then(data => res.json(data.reverse()))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Route to get a user
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'content', 'created_at']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at'],
        include: {
          model: Post,
          attributes: ['title']
        }
      },
      {
        model: Post,
        attributes: ['title'],
        through: Vote,
        as: 'voted_posts'
      }
    ]
  })
  .then(data => {
    if(!data) {
      res.status(404).json({ message: 'No user with this id has been found!' });
      return;
    }
    res.json(data);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Route to create a user
router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password
  })
  .then(data => {
    req.session.save(() => {
      req.session.user_id = data.id;
      req.session.username = data.username;
      req.session.loggedIn = true;

      res.json(data);
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Route to login user
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
  .then(data => {
    if(!data) {
      res.status(404).json({ message: 'No user with this username has been found!' });
      return;
    }
    const password = data.checkPassword(req.body.password);
    if(!password) {
      res.status(400).json({ message: 'Error!  Password is incorrect!' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = data.id;
      req.session.username = data.username;
      req.session.loggedIn = true;

      res.json({ user: data, message: 'You are now logged in!' });
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// Route to logout user
router.post('/logout', (req, res) => {
  if(req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});

// Route to update a user
router.put('/:id', withAuth, (req, res) => {
  User.update(req.body,
    {
      individualHooks: true,
      where: {
        id: req.params.id
      }
    }
  )
  .then(data => {
    if(!data) {
      res.status(404).json({ message: 'No user with this id has been found!' });
      return;
    }
    res.json(data);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Route to delete a user
router.delete('/:id', withAuth, (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(data => {
    if(!data) {
      res.status(404).json({ message: 'No user with this id has been found!' });
      return;
    }
    res.json(data);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
