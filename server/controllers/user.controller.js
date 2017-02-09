import User from '../models/user.model';

function create(req, res, next) {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

export default { create };
