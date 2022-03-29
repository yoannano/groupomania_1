"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      models.Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        },
      });
      models.Post.hasMany(models.Comment);
    }
  }
  Post.init(
    {
      UserId: DataTypes.INTEGER,
      categorie: DataTypes.STRING,
      country: DataTypes.STRING,
      content: DataTypes.STRING,
      taille: DataTypes.INTEGER,
      color: DataTypes.STRING,
      attachement: DataTypes.STRING,
      price: DataTypes.INTEGER,
      likes: DataTypes.INTEGER,
      default: 0,
      disLiked: DataTypes.INTEGER,
      default: 0,
      usersLiked: DataTypes.STRING,
      userDisliked: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
