'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      models.Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
      models.Post.hasMany(models.Comment)
    }
  };
  Post.init({
    UserId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    attachement: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};