const AttendenceModel = require('../../Models/employee/employeeAttendence');

exports.addAttendence=(req,res) => {
    async function addAttendence(){
        const attendenceRequest = new AttendenceModel({
            employeeId: req.body.employeeId,
            attendence: req.body.attendence,
            leaveRequest: req.body.leaveRequest,
            date: new Date().getDate()
        }).save((err, result) => {
            if (err) {
                res.status(500).send('Attendence not updated');
            }
            else {
                res.status(200).send('Attendence updated');
            }
        });
    };
    addAttendence();
}

exports.getAttendenceOfUser = (req,res) =>{
    async function getAttendenceOfUser(){
        const attendence=await AttendenceModel.find(({"employeeId":req.query.employeeId}), async(err, result) =>{
            if(err){
                return res.status(500).send(err);
            }
            else{
                return res.status(200).send(result);
            }
        });
    }
    getAttendenceOfUser();
}

exports.getAttendenceByDate = (req,res) =>{
    async function getAttendenceByDate(){
        const attendence=await AttendenceModel.find(({"date":req.query.date}), async(err, result) =>{
            if(err){
                return res.status(500).send(err);
            }
            else{
                return res.status(200).send(result);
            }
        });
    }
    getAttendenceByDate();
}