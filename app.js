const express = require('express');
const ejs = require('ejs');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Course = require('./models/courses');





const app = express();
const port = 3000; 

//mongodb
const dbURI = 'mongodb+srv://Maui_Burst:SDEV123@nodes-tutorial.w4fan.mongodb.net/Maui_Burst'
mongoose.connect(dbURI, {useNewURLParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3030))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');

// Middleware
app.use('/public', express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

//Login Middleware
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  };

  app.get('/dashboard', isAuthenticated, (req, res) => {
    // Dashboard content
  });

//page routes

app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});


app.get('/buildSchedule', async (req, res) => {
    try {
        const courses = await Course.find();
        res.render('./studentView/buildSchedule', { course: courses, title: 'Build Schedule' });
    } catch (err) {
        return res.status(500).send(err);
    }
});


app.get('/courseIndex', (req, res) => {
    Course.find().sort({ createdAt: -1 })
        .then((courses) => {
            res.render('./teacherView/courseindex', { title: 'Course Catalog', course: courses });
        })
        .catch((err) => {
            console.log(err);
            res.status(500);
        });
});



// Course creation route
// Get all courses and show the course index page
app.get('/courseindex', (req, res) => {
    Course.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('courseindex', { title: 'Course Catalog', course: result });
        })
        .catch((err) => {
            console.log(err);
            res.status(500);
        });
});
// Handle adding a new course
app.post('/courseindex', (req, res) => {
    const course = new Course(req.body);
    course.save()
        .then(() => {
            // Redirect to course details page
            res.redirect(`/course/${course._id}`);
        })
        .catch((err) => {
            console.log(err);
            res.status(400);
        });
});


// Get course details
app.get('/course/:id', (req, res) => {
    const id = req.params.id;
    Course.findById(id)
        .then(result => {
            if (!result) {
                return res.status(404).send('Course not found');
            }
            res.render('coursedetails', { course: result, title: 'Course Details' }); 
        })
        .catch(err => {
            console.log(err);
            res.status(500);
        });
})



//delete
app.delete('/course/:id', (req, res) => {
    const id = req.params.id;
    Course.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({ message: 'Course deleted successfully' });
        })
        .catch(err => {
            console.log(err)
        })
})







