const express =require('express');
const app=express();
const router = express.Router();
const userRegisterController = require('../Controller/register.js')

router.post('/registerUser',userRegisterController.register);
router.get('/getRegisterUser',userRegisterController.getAllUser);
router.delete('/deleteRegisterUser',userRegisterController.deleteAllUser);

module.exports = router;