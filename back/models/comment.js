'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      models.Comment.belongsTo(models.Post, {
        foreignKey: {
          allowNull: false
        }
      })
      models.Comment.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  };
  Comment.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    UserId: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};