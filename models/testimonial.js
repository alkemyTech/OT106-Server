"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Testimonial extends Model {
    static associate(models) {
      // define associations here
    }
  }

  Testimonial.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
        validate: {
          isUrl: true,
        },
      },
      content: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "Testimonial",
      paranoid: true,
      timestamps: true,
    }
  );
  return Testimonial;
};
