const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {   
        organization: {type: String},
        username: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        phonenumber: {type: Number, required: true, unique: true},
        password: {type: String, required: true},
        isAdmin: {type: Boolean, default: false},
    },{timestamps: true}
    
);

module.exports = mongoose.model('UserDetails',UserSchema);