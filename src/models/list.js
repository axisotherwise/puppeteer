const Sequelize = require("sequelize");

module.exports = class List extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.STRING(200),
        unique: true,
        primaryKey: true,
      },
      channelName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      }
    }, {
      sequelize,
      timestamps: true,
      paranoid: true,
      underscored: false,
      modelName: "List",
      tableName: "lists",
      charset: "utf8",
      collate: "utf8_general_ci",
    })
  }
}