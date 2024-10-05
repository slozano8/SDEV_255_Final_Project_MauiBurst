const express = require('express');
<<<<<<< HEAD
const mongoose = require('mongoose');
=======
const ejs = require('ejs');
const morgan = require('morgan');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Course = require('./models/courses');





>>>>>>> ba97baa90411e2ba4fd47c04af5f6285c6c216dc

const app = express();

//mongodb
const dbURI = 'mongodb+srv://Maui_Burst:SDEV123@nodes-tutorial.w4fan.mongodb.net/Maui_Burst?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewURLParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3030))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');

//middleware
app.use('/public',express.static('public'));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

<<<<<<< HEAD
// database connection
const dbURI = 'mongodb://localhost:27017/cluster2';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3030))
  .catch((err) => console.log(err));

=======

//page rountes
>>>>>>> ba97baa90411e2ba4fd47c04af5f6285c6c216dc

app.get('/', (req, res) => {
    res.render('about', {title: 'Home'});
});

app.get('/buildSchedule', (req, res) => {
    res.render('buildSchedule', {title: 'Schedule Builder'});
});

app.get('/shoppingCart', (req, res) => {
    res.render('ShoppingCart', {title: 'Shapping Cart'});
});

app.get('/currentSchedule', (req, res) => {
    res.render('currentSchedule', {title: 'Current Schedule'});
});


app.get('/instructors', (req, res) => {
    res.render('instructors', {title: 'Instructors view'});
});


app.get('/courseindex', (req, res) => {
     res.render('courseindex', {title: 'Course Index', Course});
});

app.get('/help', (req, res) => {
    res.render('help', {title: 'help'});
});

app.get('/course', (req, res) => {
    res.render('instructors', { title:'New Course'})
});

//courses route

app.post('/course', (req, res) => {
    const course = new Course(req.body);

    course.save()
        .then((result) => {
            res.redirect('/courseindex');
        })
        .catch((err) =>{
            console.log(err);
        })
        
});

app.get('/course', (req, res) => {
    Course.find().sort({ createdAt: -1})
        .then((result) => {
            res.render('/courseindex', {title: 'Course Catalog', courses: result})
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/course :id', (req, res) => {
    const id = req.params.id;
    Course.findById(id)
        .then(result => {
            render('details', { course: result, title:'Course Detials '});
        })
        .catch(err => {
            console.log(err)
        });


});


app.delete('/course :id', (req, res) => {
    const id = req.params.id;

    Course.findByIdAndDelete(id)
        .then((result) => {
            res.json({redirect:'/courseindex'})
        })
        .catch(err => {
            console.log(err)
        })
})











