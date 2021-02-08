const connector = require("../dbConnector");
const Sequelize = require("sequelize");
const metaFields = require("./MetaFields");

const { is_delete, create_dt, update_dt, delete_dt } = metaFields;

const Show = connector.define("Show", {
  no: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  thumnail: {
    type: Sequelize.STRING,
    allowNull: true
  },
  theater_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: true
  },
  start_dt: {
    type: Sequelize.DATE,
    allowNull: false
  },
  end_dt: {
    type: Sequelize.DATE,
    allowNull: false
  },
  cast: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sub_address: {
    type: Sequelize.STRING,
    allowNull: true
  },
  support: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  detail: {
    type: Sequelize.STRING,
    allowNull: true
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

module.exports = Show;