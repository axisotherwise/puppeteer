const models = require("../models");

exports.addFollow = async (req, res, next) => {
  try {
    const user = await models.User.findOne({ where: { id: req.user.id }});
    const success = await user.addYoutuber(req.params.id);
    res.json(success);
  } catch (err) {
    console.error(err);
    next(err);
  }
}

exports.unFollow = async (req, res, next) => {
  try {
    const user = await models.User.findOne({ where: { id: req.user.id }});
    const success = await user.removeYoutubers(req.params.id);
    res.json(success);
  } catch (err) {
    console.error(err);
    next(err);
  }
}

exports.test = async (req, res) => {
  
}