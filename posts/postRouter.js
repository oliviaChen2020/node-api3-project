const express = require('express');
const Posts = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const id = req.params.id;
  Posts.getById(id)
    .then((post) => {
      req.post = post;
      next();
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error: 'the specified post ID does not exist.' });
    });
}

module.exports = router;
