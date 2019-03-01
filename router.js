const Router = require('koa-router');
const ctrl = require('./controller');

const router = new Router();

router.get('/boxes', ctrl.getAllBoxes);
router.get('/box/:id', ctrl.getBox);
router.put('/box/:id', ctrl.changeStatus);
// Missing the endpoints for users
router.post('/sign-up', ctrl.signUpUser);

module.exports = router;
