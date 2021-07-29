const jwt = require('jsonwebtoken');
const newUser = require('../Models/register.js').default;

exports.auth = (req, res, next) =>{
    const token = req.cookies.jwt;
    if(!token ){
        return res.status(401).send('Access denied. No token provided');
    }
    try{
        const decoded = jwt.verify(token , 'duns');
        req.user = decoded;
        next();
    }
    catch(err){
        res.status(400).send('Invalid token');
    }
}

exports.adminAuth = (req, res, next) =>{
    const token = req.cookies.jwt;
    if(!token ){
        return res.status(401).send('Access denied. No token provided');
    }
    try{
        const decoded = jwt.verify(token , 'duns');
        newUser.findById((decoded._id), async(err, result) =>{
            if(err){
                return res.status(500).send(err);
            }
            else{
                if(result.role=='hr_admin'){
                    next();
                }
                else{
                    res.status(403).send('Employee is not authorized for this');
                }
            }
        });
    }
    catch(err){
        res.status(400).send('Invalid token');
    }
}