const Router = require('koa-router');
const boxesCtrl = require('./boxes.controller.js');
const usersCtrl = require('./users.controller.js');
const { verifyToken } = require('./verification.middleware');

const router = new Router();

router.get('/boxes', verifyToken, boxesCtrl.getAllBoxes);
router.get('/box/:id', verifyToken, boxesCtrl.getBox);
router.put('/box/:id', verifyToken, boxesCtrl.changeStatus);
router.post('/sign-up', usersCtrl.signUp);
router.get('/sign-in', usersCtrl.signIn);


module.exports = router;
