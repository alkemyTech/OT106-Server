"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    static associate(models) {
      // define associations here
    }
  }
  Contact.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.BIGINT,
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      message: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "Contact",
      paranoid: true,
      timestamps: true,
    }
  );
  return Contact;
};
