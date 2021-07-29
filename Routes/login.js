const express =require('express');
const router = express.Router();
const userLoginController = require('../Controller/login.js');
const auth = require('../Controller/auth.js');

router.post('/loginUser', userLoginController.login);
router.get('/getLoginUser', auth.auth, userLoginController.getLoginUser);
router.get('/logoutUser', auth.auth, userLoginController.logoutUser);

module.exports = router;