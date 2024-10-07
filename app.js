const express = require('express');
const ejs = require('ejs');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Course = require('./models/courses');


const app = express();

// MongoDB connection
const dbURI = 'mongodb+srv://Maui_Burst:SDEV123@nodes-tutorial.w4fan.mongodb.net/Maui_Burst?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useUnifiedTopology: true })
    .then((result) => app.listen(3030, () => console.log('Server running on port 3030')))
    .catch((err) => console.log('Connection error:', err));

app.set('view engine', 'ejs');

// Middleware
app.use('/public', express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));


//page rountes

app.get('/', (req, res) => {
    res.render('about', { title: 'Home' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'Home' });
});

app.get('/buildSchedule', async (req, res) => {
    try {
        const courses = await Course.find();
        res.render('buildSchedule', { course: courses, title: 'Build Schedule' });
    } catch (err) {
        return res.status(500).send(err);
    }
});


app.get('/shoppingCart', (req, res) => {
    res.render('ShoppingCart', { title: 'Shopping Cart' });
});

app.get('/currentSchedule', (req, res) => {
    res.render('currentSchedule', { title: 'Current Schedule' });
});

app.get('/instructors', (req, res) => {
    res.render('instructors', { title: 'Instructors view' });
});

app.get('/help', (req, res) => {
    res.render('help', { title: 'Help' });
});

app.get('/courseIndex', (req, res) => {
    Course.find().sort({ createdAt: -1 })
        .then((courses) => {
            res.render('courseindex', { title: 'Course Catalog', course: courses });
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
            res.redirect('../courseindex');
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
            render('details', { course: result, title:'Course Detials '});
        })
        .catch(err => {
            console.log(err);
        });
});

//access create

app.get('/create', (req, res) => {
    res.render('create', { title: 'Create Course' });
});

//delete
app.delete('/course/:id', (req, res) => {
    const id = req.params.id;
    Course.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({ message: 'Course deleted successfully' });
        })
        .catch(err => {
            console.log(err);
            res.status(500);
        });
});


/*const { ensureTeacher, ensureStudent } = require('./middleware/authRoles');

//  only teachers can view courseindex page
app.get('/courseindex', ensureTeacher, (req, res) => {
    res.render('courseindex', { title: 'Create Course' });
});

// Delete course for teachers only
app.delete('/course/:id', ensureTeacher, (req, res) => {
    const id = req.params.id;
    Course.findByIdAndDelete(id).then(() => {
        res.json({ redirect: '/courseindex' });
    });
});

//Adding for teachers only

app.post('/course', ensureTeacher, (req, res) => {
    const newCourse = new Course(req.body); 
    newCourse.save()
        .then(() => {
            res.json({ redirect: '/courseindex' });
        });
});
*/


