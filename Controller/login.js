const newUser = require('../Models/register.js').default;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.login = (req,res) =>{
    async function loginUser(){
    const user = {"employeeId":req.body.employeeId,
                    "password":req.body.password};
    await newUser.findOne({employeeId:user.employeeId}, async(err,result) =>{
        if(err){
            return res.status(500).send(err);
        }
        else{
            if(result!=null){
                if(bcrypt.compareSync(user.password, result.password)==true){
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
loginUser();
}
exports.getLoginUser = (req,res) =>{
    async function getLoginUser(){
        const users=await newUser.findById((req.user._id), async(err, result) =>{
            if(err){
                return res.status(500).send(err);
            }
            else{
                return res.status(200).send(result);
            }
        });
    }
    getLoginUser();
    }

// exports.deleteOneUser = (req,res) =>{
//     async function deleteOneUser(){
//         const users = await User.findById(req._id, async(err,result) =>{
//             if(err){
//                 res.status(500).send(err);
//             }
//             else{
//                 result = await result.delete();
//                 res.status(200).send(result);
//             }
//         })
//     }
//     deleteOneUser();
// }
exports.logoutUser = (req,res) =>{
    async function logoutUser(){
       return res.clearCookie('jwt').status(200).send('deleted');
    }
    logoutUser();
}