const express =require('express');
const router = express.Router();
const employeeController = require('../../Controller/employee/employee');
const attendenceController = require('../../Controller/employee/employeeAttendence');
const auth = require('../../Controller/auth.js');

router.post('/add',auth.auth,auth.adminAuth, employeeController.addEmployee);
router.post('/login',employeeController.loginEmployee);
router.get('/get/login',auth.auth, employeeController.getLoginEmployee);
router.get('/logout',auth.auth, employeeController.logoutEmployee);
router.get('/get/all',auth.auth,auth.adminAuth, employeeController.getAllEmployee);
router.get('/get/employeeId',auth.auth,auth.adminAuth,employeeController.getEmployeeByEmployeeId);
router.get('/get/email',auth.auth,auth.adminAuth,employeeController.getEmployeeByEmail);
router.delete('/delete/employees',auth.auth,auth.adminAuth,employeeController.deleteEmployees);

router.post('/add/attendence',auth.auth, attendenceController.addAttendence);
router.get('/get/attendence/user',auth.auth, attendenceController.getAttendenceOfUser);
router.get('/get/attendence/date',auth.auth, attendenceController.getAttendenceByDate);

module.exports = router;