const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.join = async (req, res, next) => {
  try {
    const exist = await User.findOne({
      where: { name: req.body.name },
    });
    if (exist) return res.redirect(`/?error=이미 가입된 회원입니다.`);
    const hash = await bcrypt.hash(req.body.pass, 12);
    await User.create({
      name: req.body.name,
      pass: hash,
    });
    return res.redirect("/");
  } catch (err) {
    console.error(err);
    next(err);
  }
}

exports.login = async (req, res, next) => {

}