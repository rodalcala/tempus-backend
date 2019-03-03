const Router = require('koa-router');
const boxesCtrl = require('./boxes.controller.js');
const usersCtrl = require('./users.controller.js');

const router = new Router();
const verifyToken = async (ctx, next) => {
  const bearerHeader = ctx.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    ctx.token = bearerToken;
    await next();
  } else {
    ctx.status = 403;
    ctx.body = 'You\'re not sign in';
    // throw new Error('You\'re not sign in');
  }
};

router.get('/boxes', verifyToken, boxesCtrl.getAllBoxes);
router.get('/box/:id', verifyToken, boxesCtrl.getBox);
router.put('/box/:id', verifyToken, boxesCtrl.changeStatus);
router.post('/sign-up', usersCtrl.signUp);
router.get('/sign-in', usersCtrl.signIn);


module.exports = router;
