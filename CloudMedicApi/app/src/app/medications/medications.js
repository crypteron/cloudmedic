angular.module('cloudmedic.medications', [
    'ui.router',
    'chart.js',
    'cloudmedic.resources',
    'form'
])
.config(['$stateProvider', function config($stateProvider) {
    $stateProvider.state('medications', {
        url: '/medications',
        views: {
            "main": {
                controller: 'MedicationsCtrl',
                templateUrl: 'medications/medications.tpl.html'
            }
        },
        resolve: {
            security: ["$q", "auth", function($q, auth) {
                if (!auth.status.token || (!auth.status.token.userRole.contains('Physician') && !auth.status.token.userRole.contains('Nurse'))) {
                    return $q.reject("Not Authorized");
                }
            }],
            medications: ["Medications", "$q", "auth", function (Medications, $q, auth) {
                if (auth.status.token.userRole.contains('Physician') || auth.status.token.userRole.contains('Nurse')) {
                    return Medications.query().$promise;
                }
            }]
        },
        data: { pageTitle: 'Medications' }
    });
}])
.controller('MedicationsCtrl', ["$scope", "$state", "medications", "Medications", "localizedNotifications", "$modal", function ($scope, $state, medications, Medications, localizedNotifications, $modal) {
    // Initialize scope variables
    $scope.medications = medications;
    $scope.medicationsRemover = new Medications();
    $scope.orderByField = 'GenericName';
    $scope.reverseSort = false;

    $scope.removeMedication = function (medication) {
        localizedNotifications.removeForCurrent();
        $modal.open({
            templateUrl: "app.confirm.tpl.html",
            controller: ['$scope', function ($scope) {
                $scope.confirmText = "You will not be able to recover this medication!";
                $scope.confirmButton = "Yes, delete medication!";
            }]
        }).result.then(function () {
            $scope.medicationsRemover.$remove({ id: medication.MedicationId }).then(function () {
                localizedNotifications.addForNext('delete.success', 'success', { entityType: 'Medication' });
                $state.go("medications", null, { reload: true });
            });
        });
    };

    $scope.createMedication = function () {
        localizedNotifications.removeForCurrent();
        $modal.open({
            templateUrl: "medications/medications.add.tpl.html",
            controller: 'MedAddCtrl'
        }).result.then(function () {
            $state.go("medications", null, { reload: true });
        });
    };

    $scope.createPrescription = function (medication) {
        $scope.medication = medication;
        localizedNotifications.removeForCurrent();
        $modal.open({
            templateUrl: "prescriptions/prescriptions.add.tpl.html",
            controller: 'AddPrescriptionsCtrl',
            resolve: {
                Candidates: ["Users", "auth", function (Users, auth) {
                    return Users.patients({ providerId: auth.status.token.userId }).$promise;
                }],
                MedId: function () {
                    return $scope.medication.MedicationId;
                },
                MedName: function () {
                    return $scope.medication.GenericName;
                }
            }
        }).result.then(function () {
            $state.go("medications", null, { reload: true });
        });
    };
}])
.controller('MedAddCtrl', ["$scope", "$state", "$modalInstance", "Medications", "localizedNotifications", function ($scope, $state, $modalInstance, Medications, localizedNotifications) {
    // Initialize scope variables
    $scope.medicationsData = {
        MedicationId: "",
        GenericName: "",
        Code: "",
        isSubmitting: false
    };
    $scope.medicationsCreator = new Medications();

    // Medication creation method
    $scope.create = function () {
        localizedNotifications.removeForCurrent();
        $scope.medicationsData.isSubmitting = true;

        // Bind scope values to creator resource
        $scope.medicationsCreator.GenericName = capitalize($scope.medicationsData.GenericName);
        $scope.medicationsCreator.Code = $scope.medicationsData.Code;

        $scope.medicationsCreator.$create().then(function () {
            localizedNotifications.addForNext('create.success', 'success', { entityType: 'Medication' });
            $modalInstance.close();
        }, function () {
            $scope.medicationsData.isSubmitting = false;
        });
    };

    $scope.Code_Valid = true;
    $scope.check_code = function () {
        if (document.getElementById("medication-code").value.match(/\D{1,5}/) != null) {
            $scope.Code_Valid = false;
            $scope.medicationsData.isSubmitting = true;
        }
        else {
            $scope.Code_Valid = true;
            $scope.medicationsData.isSubmitting = false;
        }
    };

    $scope.GenericName_Valid = true;
    $scope.check_generic_name = function () {
        if (document.getElementById("medication-genericname").value.match(/[^a-zA-Z]{1,}/) != null) {
            $scope.GenericName_Valid = false;
            $scope.medicationsData.isSubmitting = true;
        }
        else {
            $scope.GenericName_Valid = true;
            $scope.medicationsData.isSubmitting = false;
        }
    };
}]);

function capitalize(input) {
    if (input != null) {
        input = input.toLowerCase();
    }
    return input.substring(0, 1).toUpperCase() + input.substring(1);
}