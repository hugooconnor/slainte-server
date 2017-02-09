import User from '../models/user.model';

const bcrypt = require('bcrypt');

function create(req, res, next) {
  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (error, hash) => {
      // Store hash in your password DB
      const user = new User({
        username: req.body.username,
        password: hash
      });

      user.save()
        .then(savedUser => res.json(savedUser))
        .catch(e => next(e));
    });
  });
}

export default { create };
