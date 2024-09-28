const mongoose = require('mongoose');
const schema = mongoose.Schema;

const courseSchema = new schema({
    crn: {
        type: integer,
        require: true
    },
    subject: {
        type: String,
        require: true
    },
    course: {
        type: integer,
        require: true
    },
    Mode: {
        type: String,
        require: true

    },
    instructor: {
        type: String,
        require: true
    },
    daysLocation: {
        type: String,
        require: true
    },
    dates: {
        type: Date,
        require: true
    },
    credits: {
        type: integer,
        require: true
    },
    campus: {
        type: String,
        require: true
    }


}, { timestamps: true});

const courses = mongoose.model('courses', courseSchema);
module.exports = courses;
