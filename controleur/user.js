const jwt = require('jsonwebtoken');

const {Client} = require('../models/index');

exports.signup = async (req, res, next) => {

    const newUser = new Client({
        email: req.body.email,
        password: req.body.password
    });
    try{
        await newUser.save();
        res.status(200).json({
            userId: newUser._id,
            // Création d'un token pour sécuriser le compte de l'utilisateur
            token: jwt.sign(
                { userId: newUser._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
            )
        });
    }catch(e){
        console.log("ebtqfi");
        e.message = "L'utilisateur existe déjà";
        return res.status(500).json(e);
    }
}

exports.login = async (req, res, next) => {

    try{
        const user = await Client.findUser(req.body.email, req.body.password);
        res.status(200).json({
            userId: user._id,
            // Création d'un token pour sécuriser le compte de l'utilisateur
            token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
            )
        });
    }catch(e){
        res.status(401).send(e);
        //console.log(e);
    };
}