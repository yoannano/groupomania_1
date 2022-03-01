const express = require('express');
const { Sequelize } = require('sequelize');
//Pour accéder au chemin de système de fichiers, les images
const path = require('path');
//Appel du module Helmet qui permet d'améliorer la sécurité de l'appli en sécurisant les requêtes http, les entêtes, 
// empêcher le détournement de clics 
const helmet = require('helmet');
const commentRoutes = require('./routes/comment.js');
const postRoutes = require('./routes/post.js');
const userRoutes = require('./routes/user.js');
const sequelizes = require("./database/db.config");



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
const bodyParser = require("body-parser");

const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
  optionsSucessStatus: 200,
};
app.use(cors(corsOptions));


//Middleware pour contrer l'erreur de CORS bloquant les appels HTTP
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');//Pour accéder à l'API depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//Pour ajouter les headers mentionnés aux requêtes envoyées vers l'API
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//Pour permettre d'envoyer les requêtes mentionnées
  next();
});


app.use(helmet());// app.use(nocache());//Permet de désactiver la mise en cache du navigateur
//Middleware permettant de parser les requêtes envoyées par l'utilisateur
app.use(express.urlencoded({extended: true})); 
app.use(express.json());


app.use((req, res, next) => {
  const render = res.render;
  const send = res.send;
  res.render = function renderWrapper(...args) {
    Error.captureStackTrace(this);
    return render.apply(this, args);
  };
  res.send = function sendWrapper(...args) {
    try {
      send.apply(this, args);
    } catch (err) {
      console.error(
        `Error in res.send | ${err.code} | ${err.message} | ${res.stack}`
      );
    }
  };
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/Comments', commentRoutes);
app.use('/Posts', postRoutes);
app.use('/Users', userRoutes);

app.use(function (err, req, res, next) {
    console.log('This is the invalid field ->', err.field)
    next(err)
  })

//Exporter cette const pour y accéder depuis les autres fichiers dont le serveur node
module.exports = app;