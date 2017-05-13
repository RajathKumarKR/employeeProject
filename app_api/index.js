var express = require('express');
var router = express.Router();
var employeeController = require('./controllers/employeeData');

router.get('/employees', employeeController.getEmployees);
router.post('/employee', employeeController.addEmployee);
router.put('/employee', employeeController.updateEmployee);
router.delete('/employee', employeeController.removeEmployee);

module.exports = router;
