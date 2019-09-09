let mongoose = require('mongoose');

let developersSchema = mongoose.Schema({
    name:{
        firstName:{
            type:String,
            required:true,
        },
        lastName: String
    },
    level:{
        type:String,
        required:true,
        uppercase:true,
        enum:['BEGINNER','EXPERT']

    },
    address:{
        state:String,
        suburb:String,
        street:String,
        unit:String
    },
    


});

let developersModel = mongoose.model('developers',developersSchema,'developers');
module.exports = developersModel;