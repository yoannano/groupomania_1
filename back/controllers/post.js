const models = require("../models");
const jwt = require("jsonwebtoken");
const fs = require('fs');

//Création d'un post
exports.createPost = (req, res) => {
  const UserId = req.auth.userId;
  //Images
  let imageUrl = req.file;
  if (imageUrl) {
    imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  } else {
    imageUrl = null;
  }
  models.User.findOne({
    where: { id: UserId },
  });
  models.Post.create({
    UserId: UserId,
    ...req.body,
    attachement: imageUrl,
    
  })
    .then(() => res.status(201).json({ message: "Post enregistré !" }))
    .catch((error) => res.status(400).json({ error: error }));
};

exports.modifyPost = (req, res, next) => {
  const UserId = req.auth.userId;
  const post = models.Post.findOne({
    where: {
      id: req.params.id,
    },
  });
  let imageUrl = req.file;
  if (imageUrl) {
    imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  } else {
    imageUrl = post.attachement;
  }
  models.Post.update(
    {
      content: req.body.content ? req.body.content : post.content,
      attachement: imageUrl,
    },
    {
      where: {
        id: req.params.id,
        userId: UserId,
      },
    }
  )
    .then(() => res.status(200).json({ message: "Post modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
  
  const UserId = req.auth.userId;
 
  if (UserId) {
    models.Comment.destroy({
      //Pour suppr le post avec le comment
      where: {
        PostId: req.params.id,
      },
    });
    models.Post.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    models.Comment.destroy({
      //Pour suppr le post avec le comment
      where: {
        PostId: req.params.id,
      },
    });
    models.Post.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => res.status(200).json({ message: "Post supprimé !" }))
      .catch((error) => res.status(400).json({ error }));
  }
};

exports.getAllPosts = (req, res) => {
  models.Post.findAll({
    include: [
      {
        model: models.User,
        attributes: ["firstName", "lastName", "id", "attachement"],
      },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};
