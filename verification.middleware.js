const jwt = require('jsonwebtoken');

exports.verifyToken = async (ctx, next) => {
  const bearerHeader = ctx.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    await jwt.verify(bearerToken, process.env.JWT_SECRET, async (err, authData) => {
      if (err) {
        if (bearerToken === 'null') {
          ctx.status = 403;
          ctx.body = JSON.stringify('You\'re not signed in');
        } else {
          ctx.status = 403;
          ctx.body = JSON.stringify('Your session expired');
        }
      } else if (authData) {
        await next();
      }
    });
  } else {
    console.log('No authorization header'); // eslint-disable-line
    ctx.status = 400;
  }
};
