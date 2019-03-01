const bcrypt = require('bcrypt');
const atob = require('atob');
const { User } = require('./model');

exports.signUp = async (ctx) => {
  const {
    firstName,
    lastName,
    email,
    country,
  } = ctx.request.body;
  let { password } = ctx.request.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    ctx.status = 400;
    ctx.body = {
      errors: [
        'Username already exists.',
      ],
    };
  }

  try {
    password = await bcrypt.hash(password, 10);
  } catch (e) {
    throw new Error('Password missing');
  }

  ctx.body = await User.create({
    firstName,
    lastName,
    email,
    password,
    country,
  });
  ctx.status = 201;
};

exports.signIn = async (ctx, next) => {
  const basic = ctx.headers.authorization.split(' ');
  if (basic.length < 2 && basic[0] !== 'Basic') {
    throw new Error('Missing basic authentication header');
  }
  const [email, password] = atob(basic[1]).split(':');
  const user = await User.findOne({ email });
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    ctx.body = user;
  }
  await next();
};
