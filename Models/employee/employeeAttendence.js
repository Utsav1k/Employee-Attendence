var mongoose =require('mongoose');

var attendence= mongoose.model('attendence',new mongoose.Schema({
    employeeId:{
        type:String,
        maxlength:30,
        minlength:1,
        required:true
    },
    attendence:{
        type:String,
        required:true
    },
    leaveRequest:{
        type:String
    },
    date:{
        type:Date,
        required:true
    }
})
);

module.exports=attendence;