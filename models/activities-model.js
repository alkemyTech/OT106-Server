'use strict'
const {Model,DataTypes} = require('sequelize');
module.exports = (sequelize) => {
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
      type: DataTypes.INTEGER
    }, 
    name: {
      type: DataTypes.STRING,
      allowNull:false
    },

    content: {
      type: DataTypes.STRING,
      allowNull: false
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Activities',
    paranoid: true,
    timestamps: true,
  });
  return Activities
}


  