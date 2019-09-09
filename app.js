var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = new express();

mongoose.set('useNewUrlParser',true);
//require models
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(morgan('short'));
var tasks =require('./models/tasks');
var developers = require('./models/developers');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static('public'));
app.use(express.static('images'));
app.use(express.static('css'));
//open db connection
mongoose.connect("mongodb://localhost:27017/lab7",function(err){
    if (err){
        console.log(err);
        throw err;
    }else{
        console.log("connected successfully");
    }
});
app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/newtask', function (req, res) {
    res.render('newtask.html');
});

app.get('/newdeveloper', function (req, res) {
    res.render('newdeveloper.html');
});


app.get("/listtasks",function(req,res){
    tasks.find().populate('developers').exec(function(err,data){
        if(err){
            throw err;
        
        }else{
            res.render('listtasks.html',{tasks:data});
        }
    });
});

app.get("/listdevelopers",function(req,res){
    developers.find().exec(function(err,data){
        if(err){
            throw err;
        
        }else{
            res.render('listdevelopers.html',{developers:data});
        }
    });
});

//get API -> adding a new store
app.post('/addtasks', function (req, res) {
    tasks.create({
        name: req.body.taskName,
        assignTo: req.body.assignTo,
        dueDate: req.body.dueDate,
        taskStatus: req.body.taskStatus,
        taskDescription: req.body.taskDescription
    },function(err){
        if(err){
            console.log(err);
            throw err;
        }else{
            res.redirect("/listtasks");
        }

    });
});

app.post('/adddevelopers', function (req, res) {
    developers.create({
        name:{
            firstName: req.body.firstName,
            lastName: req.body.lastName
        },
        level: req.body.level,
        address:{
            state: req.body.state,
            suburb: req.body.suburb,
            street: req.body.street,
            unit: req.body.unit,
        },
    },function(err){
        if(err){
            console.log(err);
            throw err;
        }else{
            res.redirect("/listdevelopers");
        }

    });
})

app.post('/deleteWithId', function (req, res) {
    
    tasks.deleteOne({ _id: req.body.taskId2}, function (err) { });
   
    res.redirect('/listtasks');

});
;

app.post('/updateStatus', function (req, res) {
  
    tasks.updateOne({ _id: req.body.taskId }, { $set: { taskStatus: req.body.taskStatus1 } },function(err){});
    res.redirect('/listtasks');

});

app.get('/deleteCompletedtask', function (req, res) {

    tasks.deleteMany({ taskStatus: 'Complete' }, function (err) { });
    
    res.redirect('/listtasks');
});
//get API -> display all items

app.listen(8080);