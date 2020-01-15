// implement your API here
const express = require('express');
const db = require('./data/db.js');

const port = 5000;

const server = express();
server.use(express.json());

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

/***** GET ******/

// When the client makes a GET request to /api/users:

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
      console.log(req.params);
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

// server.post('/api/users', (req, res) => {
//   const userInfo = req.body;
//   const {name, bio} = req.body;
//   console.log(userInfo)
//   // console.log(bio)

//   db.insert(userInfo)
//     .then(user => {
//       if (name && bio) {
//         res.status(201).json({ user });
//       } else {
//         res.status(400).json({
//           errorMessage: 'Please provide name and bio for the user.'
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({
//         errorMessage:
//           'There was an error while saving the user to the database',
//         err
//       });
//     });
// });
