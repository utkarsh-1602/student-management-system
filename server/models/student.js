const mongoose = require('mongoose');

// Define the User schema
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    fathersName: {
        type: String,
    },
    mothersName: {
        type: String,
    },
    age: {
        type: Number,
    },
    homeAddress: {
        type: String,
    },
    rollNumber: {
        type: Number,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

// Create the User model
const Student = mongoose.model('student', studentSchema);

module.exports = Student;
