const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
require('./db');

const app = new Koa();
const port = 4000;

const router = require('./router');

app.use(bodyParser());
app.use(router.routes());

app.listen(port);
