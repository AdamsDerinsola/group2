// USER DATABASE STRUCTURE

const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
    }
})

const User = mongoose.model('User', userSchema)

module.exports= User;