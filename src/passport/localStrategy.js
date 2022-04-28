const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: "name",
    passwordField: "pass",
  }, async (name, pass, done) => {
    const exist = await User.findOne({ where: { name }});
    if (exist) {
      
    }
  }));
}