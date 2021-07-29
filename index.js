const express = require('express')
const app=express();
const cors = require('cors');
const Cookies = require('cookie-parser');
const port = process.env.port || 3001;

const userLogin =require('./Routes/login');
const userRegister =require('./Routes/register');
const employee =require('./Routes/employee/employee');


app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true,
  }));
app.use(Cookies());
app.use((req,res,next) =>{
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Credentials", true);
	next();
})


var mongoose =require('mongoose');
var mongoDB='mongodb://localhost:27017/db';
mongoose.connect(mongoDB);
mongoose.Promise=global.Promise;
var db =mongoose.connection;
db.on('connected',function(){
	console.log('connection done');
});
db.on('error',function(err){
	console.log('error');
});

app.use('/login',userLogin);
app.use('/register',userRegister);
app.use('/employee',employee);
db.close();
app.listen(port,()=>{
    console.log("started");
});