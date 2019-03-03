const bcrypt = require('bcrypt');
const atob = require('atob');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { User } = require('./model');
const { secretKey } = require('./google.maps.api');

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
        'email address already in use.',
      ],
    };
    return;
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
  if (!user) {
    ctx.body = 'Invalid email or password';
    return;
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    ctx.body = 'Invalid email or password';
    return;
  }
  /*
  Como no podemos hacer
  await jwt.sign(async)
  porque no devuelve una promise, necesitamos "promisify" it.
  La forma manual seria esta:
  function jwtSignAsync(payload, secretOrPrivateKey) {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secretOrPrivateKey, (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  }
  O podemos valernos de promisify (from node utils) ya que
  la estructura de jwt.sign(async) es la estandar de node.
  callback como ultimo parametro, y dentro del cb, el error
  como primer parametro y el payload segundo
  */
  const jwtSignAsync = promisify(jwt.sign);
  ctx.body = await jwtSignAsync({ user }, secretKey);

  await next();
};
