const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.use('/img',express.static('img'));

app.listen(3030);

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

