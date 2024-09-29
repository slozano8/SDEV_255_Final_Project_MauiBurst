const mongoose = require('mongoose');
const schema = mongoose.Schema;

const courseSchema = new schema({
    crn: {
        type: Number ,
        required: true
    },
    subject:  {
        type: String,
        required: true
    },
    course: {
        type: Number,
        required: true
    },
    Mode: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },
    daysLocation: {
        type: String,
        required: true
    },
    dates: {
        type: Date,
        required: true
    },
    credits: {
        type: Number,
        required: true
    },
    campus: {
        type: String,
        required: true
    }

}, { timestamps: true});

const Course = mongoose.model('Courses', courseSchema);
module.exports = Course;
