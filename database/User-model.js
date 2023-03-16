const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    fname: { type: String, required: true, trim: true },
    lname: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true, unique: true },
    confirmpassword: { type: String, required: true, trim: true },
    created_date: {type: Date, default: Date.now },
    // address: { type: String, required: true, trim: true },
    // mobileno: { type: Number, required: true, trim: true, unique: true },
    // dept_name: { type: String, default: null },
    // _token: { type: String, default: null },
});

// userSchema.pre('save', function (next) {
//     next();
//   });

module.exports = mongoose.model("users", userSchema);

