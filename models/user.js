const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcryptjs');

const clientSchema = mongoose.Schema({
    email: {
        type: String, 
        required: true, 
        unique: true,
        validate(v){
            if(!validator.isEmail(v)) throw new Error("Adresse mail non valide!");
            }
        }, 
    password: {
        type: String,
        required: true,
        validate(v){
            if(!validator.isLength(v, {min: 8})) throw new Error("Le mot de passe doit contenir au minimum 8 caractères!");
            },
        }
});

clientSchema.statics.findUser = async(email, password) => {
    const user = await Client.findOne({ email: email });
    if(!user) throw new Error('Adresse mail ou mot de passe incorrect.');
    const passwordValide = await bcrypt.compare(password, user.password);
    if(!passwordValide) throw new Error('Adresse mail ou mot de passe incorrect.');
    return user;
}

clientSchema.pre('save', async function(){
    if(this.isModified('password')) this.password = await bcrypt.hash(this.password, 8)
})

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;