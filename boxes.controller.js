const jwt = require('jsonwebtoken');
// const { promisify } = require('util');
const { Box } = require('./model');
const { secretKey } = require('./google.maps.api');

exports.getAllBoxes = async (ctx) => {
  try {
    ctx.body = await Box.find({});
  } catch (err) {
    console.log(err); // eslint-disable-line
    ctx.status = 500;
  }
};

exports.getBox = async (ctx) => {
  await jwt.verify(ctx.token, secretKey, async (err) => {
    // The second parameter of the callback is the user data
    // (authData) and wer don't need in this case.
    if (err) {
      ctx.status = 403;
    } else {
      ctx.body = await Box.findById(ctx.params.id);
    }
  });
  /*
  Another way of doing it:
  const jwtVerifyAsync = promisify(jwt.verify);
  await jwtVerifyAsync(ctx.token, secretKey);
  ctx.body = await Box.findById(ctx.params.id);
  */
};

exports.changeStatus = async (ctx) => {
  const {
    dataLeft = 0, minsLeft = 0, expiration = '', comments = '', simType,
  } = ctx.request.body;
  try {
    const box = await Box.findById(ctx.params.id);
    await Box.findByIdAndUpdate(ctx.params.id, {
      // It's getting a deprecation warning, but if I change
      // it to findOneAndUpdate I get the warning anyway 🤷‍
      updated: new Date().toISOString(),
      full: !box.full,
      dataLeft,
      minsLeft,
      expiration,
      simType,
      comments,
      $inc: { timesUpdated: 1 },
    });
    ctx.body = 'Box updated';
    ctx.status = 200;
  } catch (err) {
    console.log(err); // eslint-disable-line
    ctx.status = 500;
  }
};
