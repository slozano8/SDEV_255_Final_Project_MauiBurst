const express = require('express');
const ejs = require('ejs');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Course = require('./models/courses');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');


const app = express();
const port = 3000; 

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
//mongodb
//const dbURI = 'mongodb+srv://Maui_Burst:SDEV123@nodes-tutorial.w4fan.mongodb.net/Maui_Burst'
//mongoose.connect(dbURI, {useNewURLParser: true, useUnifiedTopology: true })
    //.then((result) => app.listen(3030))
    //.catch((err) => console.log(err));


app.set('view engine', 'ejs');

//middleware
app.use('/public',express.static('public'));
app.use(express.json());
app.use(morgan('dev'));

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

// courses routes


app.get('/instructors', (req, res) => {
    Course.find().sort({ createdAt: -1})
        .then((result) => {
            res.render('/courseindex', {title: 'Course Catalog', courses: result})
        })
        .catch((err) => {
            console.log(err);
        })
});

app.post('/courseindex', (req, res) => {
    const course = new Course(req.body);

    course.save()
        .then((result) => {
            res.redirect('/courseindex');
        })
        .catch((err) =>{
            console.log(err);
        })
});

app.get('/courseindex/:id', (req, res) => {
    const id = req.params.id;
    Course.findById(id)
        .then(result => {
            render('details', { course: result, title:'Course Detials '});
        })
        .catch(err => {
            console.log(err)
        });


});

app.delete('/courseindex/:id', (req, res) => {
    const id = req.params.id;

    Course.findByIdAndDelete(id)
        .then((result) => {
            res.json({redirect:'/courseindex'})
        })
        .catch(err => {
            console.log(err)
        })
})


//LOGIN PAGE: ROUTES
app.get('/views/login.ejs', (req, res) => {
    res.render('login.ejs');
  
    if (role === 'student') {
        //Handle students login logic
      } else if (role === 'teacher') {
        // Handle teacher login logic
      } else {
        // Handle invalid role
      }
    });

 app.post('//views/login.ejs', passport.authenticate('local', {
   successRedirect: '/dashboard',
    failureRedirect: '/login'
  }));

//REGISTER ROUTE
app.post('/views/register.ejs', (req, res) => {
    res.render('register.ejs') });

//MONGODB CONNECTIONS FOR LOGIN IN COMMAND PALLET
//mongodb+srv://db_NewOne:db_mbCollege@nodejs.qx72q.mongodb.net/?retryWrites=true&w=majority&appName=NodeJs//