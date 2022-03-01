const http = require('http'); //Importation du package http
const app = require('./app'); // Importation d'app pour utiliser l'appli sur le server

// normalizePort nous renvoi un port valide et configure le port de connexion en fonction de l'environnement
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// Si le port de connexion n'est pas déclaré par l'environnement, écouter sur le port 3000
const port = normalizePort(process.env.PORT || '4010');
app.set('port', port);

//Pour gérer les différentes erreurs grâce à errorHandler
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//Mise en place du server avec express en utilisant app
const server = http.createServer(app);

//Pour gérer les erreurs et lancer le server en nous affichant le port de connexion 
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

//Ecoute du port déclaré ci-dessus
server.listen(port);