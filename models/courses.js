const mongoose = require('mongoose');
const schema = mongoose.Schema;

const courseSchema = new schema({
    crn: {
        type: String,
        required: true
        
    },
    subject:  {
        type: String,
        required: true
    },
    course: {
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
    date: {
        type: String,
        required: true
        
    },
    credits: {
        type: String,
        required: true
    
    },
    description: {
        type: String,
        required: true
    }

}, { timestamps: true});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
