const BasicStrategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcrypt');
const users = require('../model/user');

const verifyPassword = function (user, password) {
  if(user.user_password == password) return true;
  return bcrypt.compareSync(password, user.user_password);
}

const checkUserAndPass = async (user_name, password, done, res) => {
  // look up the user and check the password if the user exists
  // call done() with either an error or the user, depending on outcome
  let result;
  try {
    result = await users.findByUseremail(user_name);
  } catch (error) {
    console.error(`Error during authentication for user ${user_name}`);
    return done(error);
  }
  if (result.length) {
    const user = result[0];
    if (verifyPassword(user, password)) {
      console.log(`Successfully authenticated user ${user_name}`);
      return done(null, user);
    } else {
      console.log(`Password incorrect for user ${user_name}`);
    }
  } else {
    console.log(`No user found with username ${user_name}`);
  }
  return done(null, false); // user_name or password were incorrect
}

const strategy = new BasicStrategy(checkUserAndPass);

module.exports = strategy;