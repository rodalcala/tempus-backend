const bcrypt = require('bcrypt');
const atob = require('atob');
const btoa = require('btoa');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { User } = require('./model');

exports.signUp = async (ctx, next) => {
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

  const base64 = btoa(`${email}:${password}`);
  ctx.headers.authorization = `Basic ${base64}`;

  try {
    password = await bcrypt.hash(password, +process.env.SALT);
  } catch (e) {
    throw new Error('Password missing');
  }

  await User.create({
    firstName,
    lastName,
    email,
    password,
    country,
  });

  await next();
};

exports.signIn = async (ctx, next) => {
  const basic = ctx.headers.authorization.split(' ');
  if (basic.length < 2 && basic[0] !== 'Basic') {
    throw new Error('Missing basic authentication header');
  }
  const [email, password] = atob(basic[1]).split(':');
  const user = await User.findOne({ email });
  if (!user) {
    ctx.body = JSON.stringify('Invalid email or password');
    return;
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    ctx.body = JSON.stringify('Invalid email or password');
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

  const { _id, firstName, lastName, country } = user;

  const jwtSignAsync = promisify(jwt.sign);
  ctx.body = {
    token: await jwtSignAsync({ _id, firstName, lastName, email, country }, process.env.JWT_SECRET)
  };
  ctx.stutus = 200;
};
