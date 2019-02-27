const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
require('./db');

const app = new Koa ();
const port = 3000;

const router = require('./router');

app.use(bodyParser());
app.use(router.routes());

app.listen(port);