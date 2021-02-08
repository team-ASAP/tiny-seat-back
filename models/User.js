const connector = require("../dbConnector");
const Sequelize = require("sequelize");
const metaFields = require("./MetaFields");

const { is_delete, create_dt, update_dt, delete_dt } = metaFields;

const User = connector.define("User", {
  no: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  sns_type: {
    type: Sequelize.STRING(1), // T: twitter, G: google
    allowNull: false
  },
  token: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  profile_img: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  user_type: {
    type: Sequelize.STRING(1), // B: basic, S: stage admin, A: admin
    allowNull: false
  },
  is_delete,
  create_dt,
  update_dt,
  delete_dt
}, {
  freezeTableName: true,
  underscored: true,
  timestamps: false
});

module.exports = User;