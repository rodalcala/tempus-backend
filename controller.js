const Box = require('./model');

exports.getAllBoxes = async (ctx) => {
  try {
    ctx.body = await Box.find({});
  } catch (err) {
    console.log(err); // eslint-disable-line
    ctx.status = 500;
  }
};

// exports.changeStatus = async (ctx) => {
//   const {
//     id_, dataLeft, minsLeft, expiration, comments,
//   } = ctx.request.body;
//   try {
//     Box.findByIdAndUpdate(id_, {
//       dataLeft,
//       minsLeft,
//       expiration,
//       comments,
//     });
//     ctx.status = 200;
//   } catch (err) {
//     console.log(err); // eslint-disable-line
//     ctx.status = 500;
//   }
// };
