angular.module('employeeApp').controller('ModalInstanceCtrl', function ($uibModalInstance, toastr, employeeService, data) {
    var vm = this;
    vm.level = 'ADD';
    vm.formData = {
        'id':'',
        'name': '',
        'email': '',
        'date': new Date(),
        'gender': '',
        'department': ''
    }

    if(data!=undefined){
        vm.updateData = data;
        vm.formData.id = vm.updateData._id;
        vm.formData.name = vm.updateData.name;
        vm.formData.email =vm.updateData.email;
        vm.formData.date = new Date(vm.updateData.date);
        vm.formData.gender = vm.updateData.gender;
        vm.formData.department = vm.updateData.department;
        vm.level = 'UPDATE';
    }


    vm.add = function () {
        var validationvalue = vm.validationCheck();
        if (validationvalue) {
            employeeService.addEmployee(vm.formData).then(function (data) {
                toastr.success('Employee Added');
                $uibModalInstance.close();
            }).catch(function (err) {
                toastr.error('Employee Not Added');
                $uibModalInstance.close();
            })
        } else {
            toastr.warning('Fill all values please.');
        }
    };

    vm.update = function () {
        var validationvalue = vm.validationCheck();
        if (validationvalue) {
            employeeService.updateEmployee(vm.formData).then(function (data) {
                toastr.success('Employee Updated');
                $uibModalInstance.close();
            }).catch(function (err) {
                toastr.error('Employee Not Updated');
                $uibModalInstance.close();
            })
        } else {
            toastr.warning('Fill all values please.');
        }
    };

    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    vm.validationCheck = function () {
        if (vm.formData.name == '' || vm.formData.email == '' || vm.formData.gender == '' || vm.formData.department == '' || vm.formData.name == undefined || vm.formData.email == undefined || vm.formData.gender == undefined || vm.formData.department == undefined)
            return 0;
        else
            return 1;
    }

});

// Please note that the close and dismiss bindings are from $uibModalInstance.

angular.module('employeeApp').component('modalComponent', {
    templateUrl: 'modalContent.html',
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
    controller: function () {
        var vm = this;

        vm.ok = function () {
            vm.close({
                $value: 'ok'
            });
        };

        vm.cancel = function () {
            vm.dismiss({
                $value: 'cancel'
            });
        };
    }
});
