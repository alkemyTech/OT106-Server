const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Slide extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Organization }) {
      this.belongsTo(Organization, {
        foreignKey: 'organizationId',
        targetKey: 'id',
      });
    }
  }
  Slide.init({
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    organizationId: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Slide',
    paranoid: true
  });
  return Slide;
};
