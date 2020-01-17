// implement your API here
const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');

const port = 5000;

const server = express();
server.use(express.json());
server.use(cors());

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

/***** GET ******/

// When the client makes a GET request to /api/users:

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: 'The users information could not be retrieved.',
        err
      });
    });
});

// When the client makes a GET request to /api/users/:id:

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(user => {
      user
        ? res.status(200).json(user)
        : res.status(404).json({
            message: 'The user with the specified ID does not exist.'
          });
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: 'The user information could not be retrieved.',
        err
      });
    });
});

/***** POST ******/

// When the client makes a POST request to /api/users:

server.post('/api/users', (req, res) => {
  const userInfo = req.body;
  const { name, bio } = req.body;

  name && bio
    ? db
        .insert(userInfo)
        .then(user => {
          res.status(201).json({ ...user, name, bio });
        })
        .catch(err => {
          res.status(500).json({
            errorMessage:
              'There was an error while saving the user to the database',
            err
          });
        })
    : res.status(400).json({
        errorMessage: 'Please provide name and bio for the user.'
      });
});

/***** DELETE ******/

// When the client makes a DELETE request to /api/users/:id:

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(deleted => {
      deleted
        ? res.status(200).json(`${deleted} record deleted`)
        : res.status(404).json({
            message: 'The user with the specified ID does not exist.'
          });
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: 'The user could not be removed', err });
    });
});

/***** PUT ******/

// When the client makes a PUT request to /api/users/:id:

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  const { name, bio } = req.body;

  name && bio
    ? db
        .update(id, changes)
        .then(updated => {
          if (updated) {
            res.status(200).json({ updated, name, bio });
          } else {
            res
              .status(404)
              .json({
                message: 'The user with the specified ID does not exist.'
              });
          }
        })
        .catch(err => {
          res.status(500).json({
            errorMessage: 'The user information could not be modified.',
            err
          });
        })
    : res
        .status(400)
        .json({ errorMessage: 'Please provide name and bio for the user.' });
});
