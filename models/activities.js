'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Activities.init({
    id:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    }, 
    name: {
      type: Sequelize.STRING,
      allowNull:false
    },
    
    content: {
      type: Sequelize.STRING,
      allowNull: false
    },
    
    image: {
      type: Sequelize.STRING,
      allowNull: false
    }
  

  
  }, {
    sequelize,
    modelName: 'Activities',
    paranoid: true,
    timestamps: true,
  });
  return Activities;
};