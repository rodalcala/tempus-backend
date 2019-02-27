const Router = require('koa-router');
// const ctrl = require('./controller');

const router = new Router();

router.get('/boxes');
router.put('/box/:id');
// Missing the endpoints for users

module.exports = router;
