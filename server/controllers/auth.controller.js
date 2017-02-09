import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import User from '../models/user.model';

const bcrypt = require('bcrypt');
const config = require('../../config/env');

function login(req, res, next) {
  User.findByUsername(req.body.username)
    .then((user) => {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ username: user.username }, config.jwtSecret);
          res.json({ token, username: user.username });
        } else {
          const error = new APIError('Authentication error', httpStatus.UNAUTHORIZED);
          next(error);
        }
      });
    })
    .catch(e => res.json(e));
}

export default { login };
