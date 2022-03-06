const models = require("../models");
const jwt = require("jsonwebtoken");
const comment = require("../models/comment");

exports.createComment = (req, res, next) => {
  const UserId = req.auth.userId;
  models.Comment.create({
    PostId: req.params.id,
    UserId: UserId,
    comment: req.body.comment,
  })
    .then(() => res.status(201).json({ message: "Commentaire posté !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteComment = (req, res, next) => {
  const UserId = req.auth.userId;
  if (UserId === 1) {
    models.Comment.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    models.Comment.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
      .catch((error) => res.status(400).json({ error }));
  }
};

exports.getAllComments = (req, res, next) => {
  models.Comment.findAll({
    include: [
      {
        model: models.User,
        attributes: ["firstName", "lastName", "id", "attachement"],
      },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((comments) => res.status(200).json(comments))
    .catch((error) => res.status(400).json({ error }));
};