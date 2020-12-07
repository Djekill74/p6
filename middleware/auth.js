const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, 'chaine_secrete');
        const userId = decodeToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'userId non valable';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'requete non authentifié'});
    }
};