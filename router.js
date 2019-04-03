const Router = require('koa-router');
const boxesCtrl = require('./boxes.controller.js');
const usersCtrl = require('./users.controller.js');
const { verifyToken } = require('./verification.middleware');

const router = new Router();

router.post('/sign-up', usersCtrl.signUp, usersCtrl.signIn);
router.get('/sign-in', usersCtrl.signIn);

// Protected routes
router.use(verifyToken);

router.get('/boxes', boxesCtrl.getAllBoxes);
router.get('/box/:id', boxesCtrl.getBox);
router.put('/box/:id', boxesCtrl.changeStatus);


module.exports = router;
