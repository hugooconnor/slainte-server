import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import User from '../models/user.model';

const config = require('../../config/env');

function login(req, res, next) {
  User.findByUsername(req.body.username)
    .then((user) => {
      if (user.password === req.body.password) { // todo: SHA256 hashing password with the salt
        const token = jwt.sign({ username: user.username }, config.jwtSecret);
        return res.json({ token, username: user.username });
      } else { // eslint-disable-line no-else-return
        const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED);
        return next(err);
      }
    })
    .catch(e => res.json(e));
}

export default { login };
