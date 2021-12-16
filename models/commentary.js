'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Commentary extends Model {

     static associate({ News,User  }) {
      this.belongsTo(News, {
        foreignKey: 'newsId',
        targetKey: 'id',
      });
      this.belongsTo(User, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
    }
  };
  Commentary.init({
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Commentary',
  });
  return Commentary;
};