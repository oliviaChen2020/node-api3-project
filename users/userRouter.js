const express = require('express');
const Users = require('./userDb');
const Posts = require('../posts/postDb');
const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: 'The users information could not be retrieved.' });
    });
});

// GET request to users endpoint, fetching a particular user with a specified id
router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  Users.getById(req.params.id)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .json({ message: 'the user with the specified ID does not exist.' });
      } else {
        req.user = user;
        next();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Error retrive the user' });
    });
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
