const models = require("../models");

exports.indexRender = async (req, res) => {
  res.render("index");
}

exports.rank = async (req, res) => {
  const youtubers = await models.Youtuber.findAll();
  const user = await models.User.findOne({ where: { id: req.user.id }});
  const array = await user.getYoutubers();
  let idData = [];
  let channelData = [];
  const result = array.map(el => {
    idData.push(el.dataValues.id);
    channelData.push(el.dataValues.channelName);
  });
  res.render("rank", {
    youtubers,
    user: req.user,
    followingIdList: idData,
    channelData,
  });
}

exports.join = async (req, res) => {
  res.render("join");
}

exports.profile = async (req, res) => {
  res.render("profile");
}