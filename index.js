require('dotenv').config({ path: '.env' });
require('./db');

const Koa = require('koa');
const app = new Koa();

const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const router = require('./router');

app.use(bodyParser());
app.use(cors());
app.use(router.routes());

app.listen(process.env.SERVER_PORT, async () => {
  console.log(`Listening on port ${process.env.SERVER_PORT}.`);
});
