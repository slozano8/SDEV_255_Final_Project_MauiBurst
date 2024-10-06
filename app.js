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

app.get('/buildSchedule', (req, res) => {
    res.render('buildSchedule', { title: 'Schedule Builder' });
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

app.get('/courseindex', (req, res) => {
    
    res.render('courseindex', {title: 'course index', course: Course});
});

app.get('/help', (req, res) => {
    res.render('help', { title: 'Help' });
});


//courses route
app.get('/course', (req, res) => {
    res.render('/courseindex', {title: 'Course Catalog'})
});


app.get('/course', (req, res) => {
    Course.find().sort({ createdAt: -1})
        .then((result) => {
            res.render('/courseindex', {title: 'Course Catalog', course: result})
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post('/course', (req, res) => {
    const course = new Course(req.body);

    course.save()
        .then((result) => {
            res.redirect('/courseindex');
        })
        .catch((err) => {
            console.log(err);
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


// Delete course

const { ensureTeacher } = require('./middlewares/auth');

app.delete('/course/:id', (req, res) => {
    const id = req.params.id;
    Course.findByIdAndDelete(id)
        .then((result) => {
            res.json({redirect:'/courseindex'})
        })
        .catch(err => {
            console.log(err);
        });
});
