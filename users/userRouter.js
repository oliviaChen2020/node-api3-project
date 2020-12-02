const express = require('express');
const Users = require('./userDb');
const Posts = require('../posts/postDb');
const router = express.Router();

// POST request, adding new user to the database
router.post('/', validateUser, (req, res) => {
  // do your magic!
  const newUser = req.body;
  Users.insert().then(() => {
    res.status(201).json(newUser);
  });
});

// POST request a existing user can post to the posts endpoint
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const newPosts = req.body;
  newPosts.user_id = req.params.id;
  Posts.insert()
    .then((newPost) => {
      res.status(201).json(newPost);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'There was an error while saving the comment to the database',
      });
    });
});

// GET request to users endpoint, to get all users
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

// GET request to users endpoint, get a user with specified ID
router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user);
});

router.post('/', (req, res) => {
  Users.insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Error adding the user',
      });
    });
});

// GET request to posts endpoint, to get all the posts of a user with a specified userID
router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        errorMessage:
          'Error retriving the post for the user with the specified userID',
      });
    });
});

// DELETE request to users endpoint to delete a user
router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.remove()
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: 'the user has been deleted' });
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: 'The user could not be removed' });
    });
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  const changes = req.body;
  const id = req.params.id;
  Users.update(id, changes)
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        errorMessage:
          'the user info is updated but unable to retrieve modified information.',
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: 'Erro updating the user information.' });
    });
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
  if (!req.body) {
    res.status(400).json({ error: 'user info cannot be found.' });
  } else {
    if (!req.body.name) {
      res.status(400).json({ error: 'Please provide user name' });
    } else {
      next();
    }
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ error: 'post info cannot be found.' });
  } else {
    if (!req.body.text) {
      res.status(400).json({ error: 'Please provide contents for the post.' });
    } else {
      next();
    }
  }
}

module.exports = router;
