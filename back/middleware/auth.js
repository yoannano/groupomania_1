const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];//Permet de récupérer bearer et le token mais pas l'espace entre les deux grâce à split / Si erreur, renvoi au catch
        const decodedToken = jwt.verify(token, process.env.JWT_SIGN_SECRET);//Décodage du token, vérification du token avec la clef secrète
        const userId = decodedToken.userId;//Récupération de l'userId dans le TOKEN
        if (req.body.userId && req.body.userId !== userId) {//Si l'userId du corps de la requête et si il est différent du userId
            throw 'Invalid user ID';
        } else { 
            next();
        }
    } catch {
        res.status(401).json({ 
            error: new Error('Invalid request!')
        });
    }
};