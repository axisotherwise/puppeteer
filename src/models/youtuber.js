const Sequelize = require("sequelize");

module.exports = class Youtuber extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      channelName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      image: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      subscriber: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      activity: {
        type: Sequelize.STRING(10),
        allowNull: false,
      }
    }, {
      sequelize,
      timestamps: false,
      paranoid: false,
      underscored: false,
      modelName: "Youtuber",
      tableName: "youtubers",
      charset: "utf8",
      collate: "utf8_general_ci",
    })
  }
  static associate(db) {
    db.Youtuber.belongsToMany(db.User, { through: "YoutuberLike" });
  }
}