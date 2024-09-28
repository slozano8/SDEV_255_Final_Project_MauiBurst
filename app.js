const express = require('express');
const mongoose = require('mongoose');

const app = express();

const dbURI = 'mongodb+srv://Maui_Burst:SDEV123@Maui_Burst.w4fan.mongodb.net/?retryWrites=true&w=majority&appName=Nodes-Tutorial'
mongoose.connect(dbURI, {useNewURLParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3030))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');

app.use('/img',express.static('img'));


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

app.get('/intructors', (req, res) =>{
    res.render('instructors');
});

app.get('/courseindex', (req, res) => {
    res.render('courseindex')
});

