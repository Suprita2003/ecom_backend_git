const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        capitalize: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    mobile:{
        type:Number,
        required: true,
        unique: true,
        validate: {
            validator: (v) => /^\d{10}$/.test(v), // Validate that the mobile number is exactly 10 digits
            message: 'Mobile number must be exactly 10 digits',
        },
    },
   password: {
    type: String,
    required: true,
    unique: true,
    // match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // At least one uppercase, one lowercase, one digit, and one special character
}
});

module.exports = mongoose.model('User', user);


