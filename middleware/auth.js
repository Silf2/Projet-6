const jwt = require('jsonwebtoken');

const authorization = async (req, res, next) => {
    try{
        const authToken = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(authToken, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        } else {
            next();
        }
    } catch(e) {
        res.status(404).send("Vous n'etes pas connecté!")
    }
}

module.exports = authorization;