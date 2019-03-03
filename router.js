const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const boxesCtrl = require('./boxes.controller.js');
const usersCtrl = require('./users.controller.js');
const { secretKey } = require('./google.maps.api');

const router = new Router();
const verifyToken = async (ctx, next) => {
  const bearerHeader = ctx.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    await jwt.verify(bearerToken, secretKey, async (err, authData) => {
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

router.get('/boxes', verifyToken, boxesCtrl.getAllBoxes);
router.get('/box/:id', verifyToken, boxesCtrl.getBox);
router.put('/box/:id', verifyToken, boxesCtrl.changeStatus);
router.post('/sign-up', usersCtrl.signUp);
router.get('/sign-in', usersCtrl.signIn);


module.exports = router;
