const express = require('express');
const ejs = require('ejs');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Course = require('./models/courses');




const app = express();

const dbURI = 'mongodb+srv://Maui_Burst:SDEV123@nodes-tutorial.w4fan.mongodb.net/'
mongoose.connect(dbURI, {useNewURLParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3030))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');

app.use('/img',express.static('img'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/shoppingCart', (req, res) => {
    res.render('ShoppingCart');
});

app.get('/currentSchedule', (req, res) => {
    res.render('currentSchedule');
});

app.get('/help', (req, res) => {
    res.render('help');
});

app.get('/instructors', (req, res) => {
    res.render('instructors');
});


app.get('/courseindex', (req, res) => {
    res.render('courseindex')
});





app.post('/courseindex', (req, res) => {
    const course = new Course;
    res.send(req.body)
    course.save()
        .then((result) => {
            res.redirect('/courseindex');
        })
        .catch((err) => {
            console.log(err);
        })
})



