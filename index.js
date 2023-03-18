const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require('path');
dotenv.config();

const MY_PORT = process.env.PORT;
const DBconnection = process.env.DATABASE_URI;

const app = express();
app.get("/", (req, res) => {
return
});

app.listen(MY_PORT, () => console.log(`Server running on port ${MY_PORT}`));

const userRoutes = require('./parcours/user');
const sauceRoutes = require('./parcours/sauce');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

mongoose.connect(DBconnection)
.then(() => {console.log('Mongoose est connecté.');})
.catch(err => {console.log(err)});

