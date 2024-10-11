const express = require('express');
const ejs = require('ejs');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Course = require('./models/courses');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const {requireAuth, checkUser} = require('./Middleware/authMiddleware');







const app = express();

 

//mongodb
//const dbURI = 'mongodb+srv://Maui_Burst:SDEV123@nodes-tutorial.w4fan.mongodb.net/Maui_Burst'
const dbURI = 'mongodb+srv://NewOne:NewOne@nodejs.qx72q.mongodb.net/?retryWrites=true&w=majority&appName=NodeJs'
mongoose.connect(dbURI, {useNewURLParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3030))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');

// Middleware
app.use('/public', express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());




//page routes


app.get('*', checkUser);
app.get('/login', (req, res) => {
    res.render('login', {title: 'login'});
});

app.get('/signup', (req, res) =>{
    res.render('signup', {title: 'signup'});
})

app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

app.get('/buildSchedule', requireAuth, async (req, res) => {
    try {
        const courses = await Course.find();
        res.render('./studentView/buildSchedule', { course: courses, title: 'Build Schedule' });
    } catch (err) {
        return res.status(500).send(err);
    }
});


app.get('/courseindex', (req, res) => {
    Course.find().sort({ createdAt: -1 })
        .then((courses) => {
            res.render('./teacherView/courseindex', { title: 'Course Catalog', course: courses });
        })
        .catch((err) => {
            console.log(err);
            res.status(500);
        });
});

app.use(authRoutes);






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
            console.log(err);
        });
})

app.get('/updateCourse/:id', async(req, res) => {
    try{
        const courseId = req.params.id;
        const course = await Course.findById(courseId);

        if (!course){
            req.flash('error', 'Course not found!');
            return res.redirect('/courseindex');
        }
        res.render('./teacherView/updateCourse', { title: 'Edit Course', active: 'update_course', course});

    } catch (error) {
        console.error(error);
        req.flash('error', 'something went wrong!');
        res.redirect('/courseindex');
    }
    
});

app.post('/updateCourse/:id', async(req, res) => {
    try{
        const courseId = req.params.id;
        const course = await Course.findById(courseId);

        if(!course) {
            req.flash('error', 'Course not found!');
            return res.redirect('/courseindex');
        }

       

        course.crn = req.body.crn;
        course.subject = req.body.subject;
        course.course = req.body.course;
        course.instructor = req.body.instructor;
        course.daysLocation = req.body.daysLocation;
        course.date = req.body.date;
        course.credits = req.body.credits;
        course.description = req.body.description;
        
        res.render('./teacherView/updateCourse', { title: 'Edit Course', active: 'update_course', course});
        

        await course.save();
        
       
        

    }catch (error) {
        console.error(error);
        res.redirect('/courseindex');
    }
});



app.get('/logout', (req,res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
})





