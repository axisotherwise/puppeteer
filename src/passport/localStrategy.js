const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../models/user");

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: "name",
    passwordField: "pass",
  }, async (name, pass, done) => {
    try {
      const exist = await User.findOne({ where: { name }});
      if (exist) {
        const compare = await bcrypt.compare(pass, exist.pass);
        if (compare) {
          done(null, exist);
        } else {
          done(null, false, { message: "비밀번호 불일치" }); 
        }
      } else {
        done(null, false, { message: "가입된 회원이 아닙니다." });
      }
    } catch (err) {
      console.error(err);
      done(err);
    }
  }));
}