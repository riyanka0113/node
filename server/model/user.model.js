const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    googleId: String,
    email: String,
    name: String,
    picture: String,
    token: Object,
},
{timestamps: true});

const userModel = model('User', userSchema);
 
module.exports = userModel;