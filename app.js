const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use('/img',express.static('img'));

// database connection
const dbURI = 'mongodb://localhost:27017/cluster2';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3030))
  .catch((err) => console.log(err));


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

