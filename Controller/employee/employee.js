const EmployeeModel = require('../../Models/employee/employee.js');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.addEmployee = (req,res) => {
    async function addEmployee(){
        const employee= await EmployeeModel.find();
        if(!req.body.employeeId || !req.body.firstName || !req.body.lastName || !req.body.email || !req.body.dob || !req.body.password || !req.body.confPassword || !req.body.role || !req.body.team || !req.body.salary){
           return res.status(400).send("All required fields haven't been filled");
        }
        employee.map((item,index) =>{
            if(item.email==req.body.email){
                return res.status(403).send("This email already exists");
            }
            if(item.employeeId==req.body.employeeId){
                return res.status(403).send("This employee id already exists");
            }
        })
        if(req.body.password != req.body.confPassword){
            return res.status(403).send("Passwords don't match");
        }
        const newEmployee=new EmployeeModel({
            employeeId:req.body.employeeId,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            dob:req.body.dob,
            email:req.body.email,
            password:req.body.password,
            confPassword:req.body.confPassword,
            role:req.body.role,
            team:req.body.team,
            salary:req.body.salary
        });
        const saltRounds=10;
        const pwd=await bcrypt.hashSync(newEmployee.password,saltRounds);
        const cpwd=await bcrypt.hashSync(newEmployee.confPassword,saltRounds);
        newEmployee.password=pwd;
        newEmployee.confPassword=cpwd;
        const result = await newEmployee.save();
        const response = result;
        return res.status(200).send('Employee added');
    }
    addEmployee();
};

exports.loginEmployee = (req,res) =>{
    async function loginEmployee(){
    const employee = {"employeeId":req.body.employeeId,
                    "password":req.body.password};
    await EmployeeModel.findOne({employeeId:employee.employeeId}, async(err,result) =>{
        if(err){
            return res.status(500).send(err);
        }
        else{
            if(result!=null){
                if(bcrypt.compareSync(employee.password, result.password)==true){
                    jwt.sign({_id:result._id},"duns",{expiresIn:'3600s'},(err,token) =>{
                      
                        return res.cookie('jwt',token,{maxAge : 3600000, httpOnly : false}).status(200).header({"x-auth-token" : token}).send({"msg":"Sign in successfull !!!"});
                    })
                    
            }
            else{
                return res.status(403).send("Password doesn't match");
            }
        }
        else{
            return res.status(403).send("employeeId doesn't exist !!!");
        }
        }
    })
}
loginEmployee();
}

exports.getLoginEmployee = (req,res) =>{
    async function getLoginEmployee(){
        const employee=await EmployeeModel.findById((req.user._id), async(err, result) =>{
            if(err){
                return res.status(500).send(err);
            }
            else{
                return res.status(200).send(result);
            }
        }).select(['-password', '-confPassword']);
    }
    getLoginEmployee();
}

exports.logoutEmployee = (req,res) =>{
    async function logoutEmployee(){
       return res.clearCookie('jwt').status(200).send('deleted');
    }
    logoutEmployee();
}

exports.getAllEmployee = (req,res) => {
    async function getAllEmployee(){
        const employeeList = await EmployeeModel.find().select(['-password', '-confPassword']);
        if(employeeList){
            res.status(200).send(employeeList);
        }
        else{
            res.status(501).send('some error occured');
        }
    }
    getAllEmployee();
};

exports.getEmployeeByEmployeeId = (req,res) => {
    async function getEmployeeByEmployeeId(){
        const employee = await EmployeeModel.findOne({"employeeId":req.query.employeeId}).select(['-password', '-confPassword']);
        if(employee){
            res.status(200).send(employee);
        }
        else{
            res.send('Employee not found');
        }
    }
    getEmployeeByEmployeeId();
};

exports.getEmployeeByEmail = (req,res) => {
    async function getEmployeeByEmail(){
        const employee = await EmployeeModel.findOne({"email":req.query.email}).select(['-password', '-confPassword']);
        if(employee){
            res.status(200).send(employee);
        }
        else{
            res.send('Employee not found');
        }
    }
    getEmployeeByEmail();
};

exports.deleteEmployees = (req,res) => {
    async function deleteEmployees(){
        await EmployeeModel.deleteMany({"employeeId":req.body.employees}, (err, result) =>{
            if(err){
                res.send(err);
            }
            else{
                res.send(result)
            }
        });
    }
    deleteEmployees();
};

