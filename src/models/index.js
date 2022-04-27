const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];

const User = require("./user");
const Youtuber = require("./youtuber");
const List = require("./list");

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.User = User;
db.Youtuber = Youtuber;
db.List = List;

User.init(sequelize);
Youtuber.init(sequelize);
List.init(sequelize);

User.associate(db);
Youtuber.associate(db);

module.exports = db;