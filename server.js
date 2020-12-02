const express = require('express');
const server = express();

// import userRouter into server
const userRouter = require('./users/userRouter');

server.use(express.json());
server.use(logger);

server.use('/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some Express middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(req.method, req.url);
  next();
}

module.exports = server;
