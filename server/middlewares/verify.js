const jwt = require('jsonwebtoken');
const config = require('../../config/backend');

module.exports = function verifyToken(req, res, next) {
  if (!req.headers.authorization)
    return res.sendStatus(401);

  let token = req.headers.authorization.split(' ')[1];
  if (token === 'null')
    return res.sendStatus(401);

  let payload = jwt.verify(token, config.secret);
  if (!payload)
    return res.sendStatus(401);

  req.userId = payload.subject;
  next();
};
