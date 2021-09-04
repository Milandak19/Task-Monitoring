'use strict';
const { hashPass } = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manager extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Manager.belongsTo(models.User, {foreignKey: 'userId'})
    }
  };
  Manager.init({
    userId: DataTypes.INTEGER,
    secretKey: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(manager, option) {
        manager.secretKey = hashPass(`${+new Date()} ${manager.userId}`)
      }
    },
    sequelize,
    modelName: 'Manager',
  });
  return Manager;
};