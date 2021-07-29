var mongoose =require('mongoose');

var User= mongoose.model('User',new mongoose.Schema({
    employeeId:{
        type:String,
        maxlength:30,
        required:true
    },
    password:{
        type:String,
        minlength:8,
        required:true
    }
})
);

module.exports=User;