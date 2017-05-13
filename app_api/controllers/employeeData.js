require('../models/employeedatabase')
var mongoose = require('mongoose');
var logger = require('winston');
var employee = require('../models/employee');

var sendJsonResponse = function(res, respObj) {
    res.status(respObj.status);
    res.json(respObj.message);
};


var createResponse = function() {
    var response = {
        status: 200,
        message: ''
    };
    return response;
}

var employeeController = {
    getEmployees: getEmployees,
    addEmployee: addEmployee,
    updateEmployee: updateEmployee,
    removeEmployee: removeEmployee
}

function getEmployees(req, res) {
    var response = createResponse();
    employee.find({}).exec(function(err, data) {
        if (err) {
            logger.log('error', err);
            response.status = 500;
            response.message = err;
        } else {
            response.status = 200;
            response.message = data;
            logger.info("GET: data fetch successful.");
        }
        //console.log(resp);
        sendJsonResponse(res, response);
    });
};

function addEmployee(req, res) {

    var response = createResponse();

    //console.log("IN POST:", req.body);
    var newEmployee = new employee(req.body);
    var nowTime = Date.now();
    var diffTime = nowTime - newEmployee.date.getTime();
    var age = new Date(diffTime);
    newEmployee.age = Math.abs(age.getUTCFullYear() - 1970);

    //console.log("New Employee: ", newEmployee);

    newEmployee.save(function(err, data) {
        if (err) {
            logger.error(err);
            response.status = 500;
            response.message = err;
        } else {
            //console.log(data);
            response.status = 200;
            response.message = data;
            logger.info("POST: data add successful.");
        }
        sendJsonResponse(res, response);
    });
};

function updateEmployee(req, res) {
    var response = createResponse();
    console.log("IN POST:", req.body);
    var newEmployee = new employee(req.body);
    var nowTime = Date.now();
    var diffTime = nowTime - newEmployee.date.getTime();
    var age = new Date(diffTime);
    newEmployee.age = Math.abs(age.getUTCFullYear() - 1970);
    console.log("New Employee: ", newEmployee);
    employee.update({
        email: req.body.email
    }, {
        $set: {
            name: newEmployee.name,
            email: newEmployee.email,
            date: newEmployee.date,
            department: newEmployee.department,
            gender: newEmployee.gender,
            age: newEmployee.age
        }
    }, function(err, data) {
        if (err) {
            logger.error(err);
            response.status = 500;
            response.message = err;
        } else {
            response.status = 200;
            response.message = "Data updated successfully";
            logger.info("Data updated successfully.");
        }
        sendJsonResponse(res, response);
    });
};

function removeEmployee(req, res) {
    var response = createResponse();
    employee.findOneAndRemove({
        email: req.query.email
    }, function(err, done) {
        if (err) {
            logger.error(err);
            response.status = 500;
            response.message = err;
        } else {
            response.status = 200;
            response.message = done;
            logger.info("DELETE: data delete successful.");
        }
        sendJsonResponse(res, response);
    })
};


module.exports = employeeController;
