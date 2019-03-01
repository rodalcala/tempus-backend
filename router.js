const Router = require('koa-router');
const boxesCtrl = require('./boxes.controller.js');
const usersCtrl = require('./users.controller.js');

const router = new Router();

router.get('/boxes', boxesCtrl.getAllBoxes);
router.get('/box/:id', boxesCtrl.getBox);
router.put('/box/:id', boxesCtrl.changeStatus);
// Missing the endpoints for users
router.post('/sign-up', usersCtrl.signUp);
router.get('/sign-in', usersCtrl.signIn);

module.exports = router;
