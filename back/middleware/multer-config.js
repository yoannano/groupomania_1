//Pour faciliter la gestion de fichiers envoyés avec requêtes http vers l'api, utilisation du package Multer
const multer = require('multer');

//Objet pour pouvoir créer l'extension de fichier pour les images
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'
};

//Création d'objet de config pour multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');//'images' correspondant au nom de dossier
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');//On prend le nom d'origine et on remplace les espaces par des _ pour éviter les problèmes côté serveur
        const extension = MIME_TYPES[file.mimetype]; //extension de fichier 
        callback(null, name + Date.now() + '.' + extension);// Date.now est un time stamp 
        //Nom, time stamp et extension du fichier
    }
});

//Single pour dire qu'il s'agit d'un fichier unique et pas un groupe de fichiers
module.exports = multer({storage: storage}).single('attachement');


