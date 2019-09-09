let mongoose = require('mongoose');

let tasksSchema = mongoose.Schema({
    name:String,
    assignTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'developers'
    },
    dueDate:Date,
    taskStatus:{
        type:String,
        enum:['InProgress','Complete']
    },
    taskDescription:String,
    


});

let tasksModel = mongoose.model('tasks',tasksSchema,'tasks');
module.exports = tasksModel;