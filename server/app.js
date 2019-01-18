import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

import * as db from './utils/dataBaseUtils';

const verifyToken = (req, res, next) => {
  // get auth header value

  const bearerHeader = req.headers.authorization;
  // check if its not undef

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');

    const bearerToken = bearer[1];

    req.token = bearerToken;
    next();
  } else {
    // forbedden
    res.sendStatus(403);
  }
};

db.setUpConnection();

const app = express();

app.use(bodyParser.json());

app.post('/login', (req, res) => {
  // Mock user
  const user = {
    id: 1,
    username: 'Maryia',
    email: 'maryakukharchuk@gmail.com',
  };

  jwt.sign({ user }, 'secretKey', (err, token) => {
    res.json({ token });
  });
});

app.get('/notes', (req, res) => {
  db.listNotes().then(data => res.send(data));
});

app.post('/notes', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretKey', (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      db.createNote(req.body).then(data => res.send(data));
    }
  });
});

app.delete('/notes/:id', (req, res) => {
  db.deleteNote(req.params.id).then(data => res.send(data));
});

app.listen(7000, () => {
  console.log('server on 7000');
});
