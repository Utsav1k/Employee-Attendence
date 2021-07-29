var newUser = require('../Models/register.js').default;
const bcrypt=require('bcryptjs');

exports.register = (req,res) =>{
    async function registerUser(){
        const users= await newUser.find();
        if(!req.body.employeeId || !req.body.firstName || !req.body.lastName || !req.body.email || !req.body.dob || !req.body.password || !req.body.confPassword ){
           return res.status(400).send({msg:"All required fields haven't been filled"});
        }
        users.map((item) =>{
            if(item.email==req.body.email){
                return res.status(403).send("This email already exists")
            }
            if(item.employeeId==req.body.employeeId){
                return res.status(403).send("This employee id already exists")
            }
        })
        if(req.body.password != req.body.confPassword){
            return res.status(403).send("Passwords don't match");
        }
        const user=new newUser({
            employeeId:req.body.employeeId,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            dob:req.body.dob,
            email:req.body.email,
            password:req.body.password,
            confPassword:req.body.confPassword,
            role:"hr_admin"
        });
        const saltRounds=10;
        const pwd=bcrypt.hashSync(user.password, saltRounds);
        const cpwd=bcrypt.hashSync(user.confPassword, saltRounds);
        user.password=pwd;
        user.confPassword=cpwd;
        const result = await user.save();
        return res.status(200).send(result);
    }
    registerUser();
}
exports.getAllUser = (req,res) =>{
    async function getUser(){
        const users=await newUser.find();
        res.status(200).send(users);
    }
    getUser();
}
exports.deleteAllUser = (req,res) =>{
        async function deleteUser(){
            const users=await newUser.deleteMany();
            res.status(200).send(users);
        }
        deleteUser();
}