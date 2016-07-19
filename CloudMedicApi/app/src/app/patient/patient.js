angular.module('cloudmedic.patient', [
    'ui.router',
    'chart.js',
    'cloudmedic.resources',
    'form'
])
.config(["$stateProvider", function config($stateProvider) {
    $stateProvider.state('patient', {
        url: '/users',
        views: {
            "main": {  
                controller: 'PatientCtrl',
                templateUrl: 'patient/patient.tpl.html'
            }
        },
        resolve: {
            security: ["$q", "auth", function ($q, auth) {
                if (!auth.status.token || !auth.status.token.userRole.contains('Patient')) {
                    return $q.reject("Not Authorized");
                }
            }],
            prescriptions: ["Users", "auth", function (Users, auth) {
                return Users.meds({ id: auth.status.token.userId }).$promise;
            }],
            careTeams: ["Users", "$q", "auth", function (Users, $q, auth) {
                if (auth.status.token.userRole.contains('Patient')) {
                    return Users.paTeams({ id: auth.status.token.userId }).$promise;
                }
            }]
        },
        data: { pageTitle: 'Patient' }
    });
}])
.controller('PatientCtrl', ["$scope", "$state", "$filter", "$modal", "prescriptions", "careTeams", "CareTeams", "localizedNotifications", function ($scope, $state, $filter, $modal, prescriptions, careTeams, CareTeams, localizedNotifications) {
    $scope.prescriptions = prescriptions;
    $scope.orderByFieldPending = 'Name';
    $scope.reverseSortPending = false;
    $scope.orderByFieldPrescription = 'MedicationName';
    $scope.reverseSortPrescription = false;
    $scope.orderByFieldCareTeam = 'Name';
    $scope.reverseSortCareTeam = false;
    $scope.hasPending = false;
    $scope.CareTeamUpdater = new CareTeams();
    $scope.ActiveTab = [false,true,false];

    for(var i = 0; i < careTeams.length; i++)
    {
        if(!careTeams[i].Active)
        {
            $scope.hasPending = true;
            $scope.ActiveTab[0] = true;
            $scope.ActiveTab[1] = false;
        }
      
    }

    $scope.careTeams = careTeams;

    $scope.isActive = function (careTeam) {
        return (careTeam.Active);
    };

    $scope.isPending = function (careTeam) {
        return (!careTeam.Active);
    };

    $scope.approveCareTeam = function (careTeam) {
        localizedNotifications.removeForCurrent();
        $modal.open({
            templateUrl: "app.confirm.tpl.html",
            controller: ["$scope", function ($scope) {
                $scope.confirmText = "Are you sure you want to approve this care team?";
                $scope.confirmButton = "Yes";
            }]
        }).result.then(function () {
            $scope.CareTeamUpdater.Id = careTeam.Id;
            $scope.CareTeamUpdater.$activate().then(function () {
                localizedNotifications.addForNext('update.success', 'success', { entityType: 'CareTeam' });
                $state.go("patient", null, { reload: true });
            });
        });
    };

    $scope.rejectCareTeam = function (careTeam) {
        localizedNotifications.removeForCurrent();
        $modal.open({
            templateUrl: "app.confirm.tpl.html",
            controller: ["$scope", function ($scope) {
                $scope.confirmText = "Are you sure you want to remove this care team?";
                $scope.confirmButton = "Yes";
            }]
        }).result.then(function () {
            $scope.CareTeamUpdater.Id = careTeam.Id;
            $scope.CareTeamUpdater.$remove({ id: careTeam.Id }).then(function () {
                localizedNotifications.addForNext('delete.success', 'success', { entityType: 'CareTeam' });
                $state.go("patient", null, { reload: true });
            });
        });
    };
}]);
