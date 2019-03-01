const Box = require('./model');

exports.getAllBoxes = async (ctx) => {
  try {
    ctx.body = await Box.find({});
  } catch (err) {
    console.log(err); // eslint-disable-line
    ctx.status = 500;
  }
};

exports.getBox = async (ctx) => {
  try {
    const box = await Box.find({ _id: ctx.params.id });
    [ctx.body] = box;
  } catch (err) {
    console.log(err); // eslint-disable-line
    ctx.status = 500;
  }
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
