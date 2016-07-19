angular.module("cloudmedic.admin", [
    'ui.router',
    'ui.mask',
    'form',
    'cloudmedic.resources'
])
.config(["$stateProvider", function config($stateProvider) {
    $stateProvider.state('admin', {
        url: '/admin',
        views: {
            "main": {
                controller: 'AdminCtrl',
                templateUrl: 'admin/admin.tpl.html'
            }
        },
        resolve: {
            security: ["$q", "auth", function ($q, auth) {
                if (!auth.status.token || !auth.status.token.userRole.contains('SysAdmin')) {
                    return $q.reject("Not Authorized");
                }
            }],
            careTeams: ["CareTeams", "$q", "auth", function (CareTeams, $q, auth) {
                if (auth.status.token.userRole.contains('SysAdmin')) {
                    return CareTeams.query().$promise;
                }
            }]
        },
        data: { pageTitle: 'Admin' }
    });
}])
.controller('AdminCtrl', ["$scope", "$state", "$modal", "$q", "Users", "careTeams", "CareTeams", "localizedNotifications", function ($scope, $state, $modal, $q, Users, careTeams, CareTeams, localizedNotifications) {
    // Initialize scope variables
    $scope.careTeams = angular.copy(careTeams);
    $scope.inactiveTeams = [];
    $scope.inactiveTeamsEmpty = true;
    var x = $scope.careTeams.length;
    while (x--) {
        if (!$scope.careTeams[x].Active) {
            $scope.inactiveTeams.push($scope.careTeams[x]);
            $scope.careTeams.splice(x, 1);
            $scope.inactiveTeamsEmpty = false;
        }
    }
    $scope.users = new Users();
    $scope.careteamRemover = new CareTeams();
    $scope.isProvider = function (user) {
        return user.Roles == 'Nurse' || user.Roles == 'Physician';
    };
    $scope.patients = [];
    $scope.patientsPage = 1;
    $scope.physicians = [];
    $scope.physiciansPage = 1;
    $scope.nurses = [];
    $scope.nursesPage = 1;
    $scope.supporters = [];
    $scope.supportersPage = 1;
    $scope.hasNext = false;
    $scope.hasPrev = false;
    $scope.numPages = 1;
    $scope.isLoading = false;

    // Default values for table display
    $scope.orderByFieldPatient = ['LastName', 'FirstName'];
    $scope.reverseSortPatient = false;

    $scope.orderByFieldPhysician = ['LastName', 'FirstName'];
    $scope.reverseSortPhysician = false;

    $scope.orderByFieldNurse = ['LastName', 'FirstName'];
    $scope.reverseSortNurse = false;

    $scope.orderByFieldCareTeam = 'Name';
    $scope.reverseSortCareTeam = false;

    $scope.orderByFieldSupporter = ['LastName', 'FirstName'];
    $scope.reverseSortSupporter = false;

    $scope.ProviderTabActive = false;
    $scope.SupporterTabActive = false;

    // Load Users for the tabs
    $scope.getPatients = function (page) {
        $scope.isLoading = true;
        $scope.ProviderTabActive = false;
        $scope.SupporterTabActive = false;
        $scope.users.$query({ page: page, role: "Patient" }).then(function (result) {
            $scope.patients = result.Users;
            $scope.hasNext = result.HasNext;
            $scope.hasPrev = result.HasPrev;
            $scope.numPages = result.NumPages;
            $scope.patientsPage = page;
            $scope.isLoading = false;
        });
    };

    $scope.getPhysicians = function (page) {
        $scope.isLoading = true;
        $scope.ProviderTabActive = true;
        $scope.SupporterTabActive = false;
        $scope.users.$query({ page: page, role: "Physician" }).then(function (result) {
            $scope.physicians = result.Users;
            $scope.hasNext = result.HasNext;
            $scope.hasPrev = result.HasPrev;
            $scope.numPages = result.NumPages;
            $scope.physiciansPage = page;
            $scope.isLoading = false;
        });
    };

    $scope.getNurses = function (page) {
        $scope.isLoading = true;
        $scope.ProviderTabActive = true;
        $scope.SupporterTabActive = false;
        $scope.users.$query({ page: page, role: "Nurse" }).then(function (result) {
            $scope.nurses = result.Users;
            $scope.hasNext = result.HasNext;
            $scope.hasPrev = result.HasPrev;
            $scope.numPages = result.NumPages;
            $scope.nursesPage = page;
            $scope.isLoading = false;
        });
    };

    $scope.getSupporters = function (page) {
        $scope.isLoading = true;
        $scope.ProviderTabActive = false;
        $scope.SupporterTabActive = true;
        $scope.users.$query({ page: page, role: "Supporter" }).then(function (result) {
            $scope.supporters = result.Users;
            $scope.hasNext = result.HasNext;
            $scope.hasPrev = result.HasPrev;
            $scope.numPages = result.NumPages;
            $scope.supportersPage = page;
            $scope.isLoading = false;
        });
    };

    // Remove entities from database
    $scope.removeUser = function (user) {
        localizedNotifications.removeForCurrent();
        $modal.open({
            templateUrl: "app.confirm.tpl.html",
            controller: ["$scope", function ($scope) {
                $scope.confirmText = "You will not be able to recover this User!";
                $scope.confirmButton = "Yes, delete User!";
            }]
        }).result.then(function () {
            $scope.users.$remove({ id: user.UserId }).then(function () {
                localizedNotifications.addForNext('delete.success', 'success', { entityType: 'User' });
                $state.go("admin", null, { reload: true }); 
            });
        });
    };

    $scope.removeCareTeam = function (careTeam) {
        localizedNotifications.removeForCurrent();
        $modal.open({
            templateUrl: "app.confirm.tpl.html",
            controller: ["$scope", function ($scope) {
                $scope.confirmText = "You will not be able to recover this care team!";
                $scope.confirmButton = "Yes, delete care team!";
            }]
        }).result.then(function () {
            $scope.careteamRemover.$remove({ id: careTeam.Id }).then(function () {
                localizedNotifications.addForNext('delete.success', 'success', { entityType: 'CareTeam' });
                $state.go("admin", null, { reload: true });
            });
        });
    };

    // Create new instances/entities
    $scope.createProvider = function () {
        localizedNotifications.removeForCurrent();
        $modal.open({
            templateUrl: "provider/provider.add.tpl.html",
            controller: 'FormCtrl'
        }).result.then(function () {
            $state.go("admin", null, { reload: true });
        });
    };

    $scope.createSupporter = function () {
        localizedNotifications.removeForCurrent();
        $modal.open({
            templateUrl: "supporter/supporter.add.tpl.html",
            controller: 'FormCtrl'
        }).result.then(function () {
            $state.go("admin", null, { reload: true });
        });
    };

    $scope.createCareTeam = function (user) {
        localizedNotifications.removeForCurrent();
        $scope.user = user;
        $modal.open({
            templateUrl: "careteams/careteams.add.tpl.html",
            controller: 'CareTeamAddCtrl',
            resolve: {
                user: function () { return $scope.user; }
            }
        }).result.then(function () {
            $state.go("admin", null, { reload: true });
        });
    };

    $scope.createSupporter = function () {
        localizedNotifications.removeForCurrent();
        $modal.open({
            templateUrl: "supporter/supporter.add.tpl.html",
            controller: 'FormCtrl'
        }).result.then(function () {
            $state.go("admin", null, { reload: true });
        });
    };

    // Update entities
    $scope.updateCareTeam = function (careTeam) {
        localizedNotifications.removeForCurrent();
        $modal.open({
            templateUrl: "careteams/careteams.update.tpl.html",
            controller: 'CareTeamUpdateCtrl',
            resolve: {
                careTeam: function () { return careTeam; },
                providers: function () { return $scope.providers; }
            }
        }).result.then(function () {
            $state.go("admin", null, { reload: true });
        });
    };
}]);
