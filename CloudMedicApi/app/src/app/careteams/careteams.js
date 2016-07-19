angular.module('cloudmedic.careteams', [
    'ui.router',
    'chart.js',
    'cloudmedic.resources',
    'form'
])
.controller('CareTeamAddCtrl', ["$scope", "$modal", "$modalInstance", "CareTeams", "user", "Users", "localizedNotifications", function ($scope, $modal, $modalInstance, CareTeams, user, Users, localizedNotifications) {
    // Initialize scope variables
    $scope.creator = new CareTeams();
    $scope.creator.ProviderIds = [""];
    $scope.creator.Name = "";
    $scope.patientName = user.FirstName + " " + user.LastName;
    $scope.providerEmail = "";
    $scope.providerIds = [];
    $scope.selectedProviders = [];
    // $scope.supporterEmailFilter = ""; //TODO: This isn't used anywhere, so commented it. Look into this if supporterEmail search is broken
    $scope.supporterIds = [];
    $scope.selectedSupporters = [];
    $scope.data = {
        isSubmitting: false
    };

    $scope.capitalizeTeamName = function() {//TODO: make this function "private"
        var nextWord = true;
        var capitalized = "";
        var word = $scope.creator.Name;
        for (var i = 0; i < $scope.creator.Name.length; i++) {
            if (word[i] == " ") {
                nextWord = true;
                capitalized += word[i];
            } else {
                if (nextWord) {
                    nextWord = false;
                    capitalized += word[i].toUpperCase();
                } else {
                    capitalized += word[i];
                }
            }
        }
        return capitalized;
    };


    $scope.create = function () {
        localizedNotifications.removeForCurrent();
        $scope.data.isSubmitting = true;
        $scope.creator.Name = $scope.capitalizeTeamName();
        $scope.creator.PatientId = user.UserId;
        $scope.creator.ProviderIds = $scope.providerIds;
        $scope.creator.SupporterIds = $scope.supporterIds;
        $scope.creator.$create().then(function () {
            localizedNotifications.addForNext('create.success', 'success', { entityType: 'CareTeam' });
            $modalInstance.close();
        }, function () {
            $scope.data.isSubmitting = false;
        });
    };

    $scope.error = "";

    // Provider functions
    $scope.searchProviders = function () {
        if ($scope.providerEmail.length > 0) {
            var providerResults = Users.providers({ email: $scope.providerEmail }).$promise.then(function (result) {
                $scope.addProvider(angular.fromJson(result));
            }, function (error) {
                if (error.status == "404") {
                    localizedNotifications.removeForCurrent();
                    $modal.open({
                        templateUrl: "app.error.tpl.html",
                        controller: ["$scope", function ($scope) {
                            $scope.errorType = "Not Found!";
                            $scope.confirmText = "Provider with specified email not found. Create a new provider and try again, or try a different address.";
                            $scope.confirmButton = "Create New Provider";
                        }]
                    }).result.then(function () {
                        localizedNotifications.removeForCurrent();
                        $modal.open({
                            templateUrl: "provider/provider.add.tpl.html",
                            controller: 'FormCtrl'
                        });
            });
        }
            });
            $scope.providerEmail = "";
        }
    };

    $scope.addProvider = function (provider) {
        if (!alreadySelected(provider.UserId, $scope.selectedProviders)) {
        $scope.selectedProviders.push(angular.copy(provider));
        $scope.providerIds.push(provider.UserId);
        }
    };

    $scope.removeProvider = function (provider) {
        $scope.providerIds.splice($scope.providerIds.indexOf(provider.UserId), 1);
        for (var i = 0; i < $scope.selectedProviders.length; i++) {
            if ($scope.selectedProviders[i].UserId.localeCompare(provider.UserId) === 0) {
                $scope.selectedProviders.splice(i, 1);
                break;
            }
        }
    };

    // Supporter functions
    $scope.searchSupporters = function () {
        if ($scope.supporterEmail.length > 0) {
            var supporterResults = Users.supporters({ email: $scope.supporterEmail }).$promise.then(function (result) {
                $scope.addSupporter(angular.fromJson(result));
            }, function (error) {
                if (error.status == "404") {
                    localizedNotifications.removeForCurrent();
                    $modal.open({
                        templateUrl: "app.error.tpl.html",
                        controller: ["$scope", function ($scope) {
                            $scope.errorType = "Not Found!";
                            $scope.confirmText = "Supporter with specified email not found. Create a new provider and try again, or try a different address.";
                            $scope.confirmButton = "Create New Supporter";
                        }]
                    }).result.then(function () {
                        localizedNotifications.removeForCurrent();
                        $modal.open({
                            templateUrl: "supporter/supporter.add.tpl.html",
                            controller: 'FormCtrl'
                        });
            });
        }
            });
            $scope.supporterEmail = "";
        }
    };

    $scope.addSupporter = function (supporter) {
        if (!alreadySelected(supporter.UserId, $scope.selectedSupporters)) {
        $scope.selectedSupporters.push(angular.copy(supporter));
        $scope.supporterIds.push(supporter.UserId);
        }
    };

    $scope.removeSupporter = function (supporter) {
        $scope.supporterIds.splice($scope.supporterIds.indexOf(supporter.UserId), 1);
        for (var i = 0; i < $scope.selectedSupporters.length; i++) {
            if ($scope.selectedSupporters[i].UserId.localeCompare(supporter.UserId) === 0) {
                $scope.selectedSupporters.splice(i, 1);
                break;
            }
        }
    };

    // Bind the enter key on the two search input fields
    $scope.enterProviders = function (key) {
        if (key.which === 13) {
            $scope.searchProviders();
        }
    };
    $scope.enterSupporters = function (key) {
        if (key.which === 13) {
            $scope.searchSupporters();
        }
    };

    // check if user already exists
    var alreadySelected = function (id, selected) {
        var i = selected.length;
        while (i--) {
            var selectedId = selected[i].UserId;
            if (id.localeCompare(selectedId) === 0) {
                return true;
            }
        }
        return false;
    };
}])
.controller('CareTeamUpdateCtrl', ["$scope", "$modal", "$modalInstance", "careTeam", "CareTeams", "Users", "localizedNotifications", function ($scope, $modal, $modalInstance, careTeam, CareTeams, Users, localizedNotifications) {
    // Initialize scope variables
    $scope.careTeam = angular.copy(careTeam);

    $scope.providerEmail = "";
    $scope.providerIds = [];
    $scope.selectedProviders = [];
    // Add current providers to selected
    for (var x = 0; x < $scope.careTeam.Providers.length; x++) {
        var provider = $scope.careTeam.Providers[x];
        $scope.providerIds.push(provider.UserId);
        $scope.selectedProviders.push(angular.copy(provider));
    }

    $scope.supporterEmail = "";
    $scope.supporterIds = [];
    $scope.selectedSupporters = [];
    // Add current supporters to selected
    for (var y = 0; y < $scope.careTeam.Supporters.length; y++) {
        var supporter = $scope.careTeam.Supporters[y];
        $scope.supporterIds.push(supporter.UserId);
        $scope.selectedSupporters.push(angular.copy(supporter));
    }
    $scope.data = {
        isSubmitting: false
    };

    $scope.Updater = new CareTeams();
    $scope.update = function () {
        localizedNotifications.removeForCurrent();
        $scope.Updater.TeamId = $scope.careTeam.Id;
        $scope.Updater.TeamName = $scope.careTeam.Name;
        $scope.Updater.ProviderIds = $scope.providerIds;
        $scope.Updater.SupporterIds = $scope.supporterIds;
        $scope.Updater.$update().then(function () {
            localizedNotifications.addForNext('update.success', 'success', { entityType: 'CareTeam' });
            $modalInstance.close();
        }, function () {
            $scope.data.isSubmitting = false;
        });
    };

    // Provider functions
    $scope.searchProviders = function () {
        if ($scope.providerEmail.length > 0) {
            var providerResults = Users.providers({ email: $scope.providerEmail }).$promise.then(function (result) {
                $scope.addProvider(angular.fromJson(result));
            }, function (error) {
                if (error.status == "404") {
                    localizedNotifications.removeForCurrent();
                    $modal.open({
                        templateUrl: "app.error.tpl.html",
                        controller: ["$scope", function ($scope) {
                            $scope.errorType = "Not Found!";
                            $scope.confirmText = "Provider with specified email not found. Create a new provider and try again, or try a different address.";
                            $scope.confirmButton = "Create New Provider";
                        }]
                    }).result.then(function () {
                        localizedNotifications.removeForCurrent();
                        $modal.open({
                            templateUrl: "provider/provider.add.tpl.html",
                            controller: 'FormCtrl'
                        });
            });
        }
            });
            $scope.providerEmail = "";
        }
    };

    $scope.addProvider = function (provider) {
        if (!alreadySelected(provider.UserId, $scope.selectedProviders)) {
        $scope.selectedProviders.push(angular.copy(provider));
        $scope.providerIds.push(provider.UserId);
        }
    };

    $scope.removeProvider = function (provider) {
        $scope.providerIds.splice($scope.providerIds.indexOf(provider.UserId), 1);
        for (var i = 0; i < $scope.selectedProviders.length; i++) {
            if ($scope.selectedProviders[i].UserId.localeCompare(provider.UserId) === 0) {
                $scope.selectedProviders.splice(i, 1);
                break;
            }
        }
    };

    // Supporter functions
    $scope.searchSupporters = function () {
        if ($scope.supporterEmail.length > 0) {
            var supporterResults = Users.supporters({ email: $scope.supporterEmail }).$promise.then(function (result) {
                $scope.addSupporter(angular.fromJson(result));
            }, function (error) {
                if (error.status == "404") {
                    localizedNotifications.removeForCurrent();
                    $modal.open({
                        templateUrl: "app.error.tpl.html",
                        controller: ["$scope", function ($scope) {
                            $scope.errorType = "Not Found!";
                            $scope.confirmText = "Supporter with specified email not found. Create a new supporter and try again, or try a different address.";
                            $scope.confirmButton = "Create New Supporter";
                        }]
                    }).result.then(function () {
                        localizedNotifications.removeForCurrent();
                        $modal.open({
                            templateUrl: "supporter/supporter.add.tpl.html",
                            controller: 'FormCtrl'
                        });
            });
        }
            });
            $scope.supporterEmail = "";
        }
    };

    $scope.addSupporter = function (supporter) {
        if (!alreadySelected(supporter.UserId, $scope.selectedSupporters)) {
        $scope.selectedSupporters.push(angular.copy(supporter));
        $scope.supporterIds.push(supporter.UserId);
        }
    };

    $scope.removeSupporter = function (supporter) {
        $scope.supporterIds.splice($scope.supporterIds.indexOf(supporter.UserId), 1);
        for (var i = 0; i < $scope.selectedSupporters.length; i++) {
            if ($scope.selectedSupporters[i].UserId.localeCompare(supporter.UserId) === 0) {
                $scope.selectedSupporters.splice(i, 1);
                break;
            }
        }
    };

    // Bind the enter key on the two search input fields
    $scope.enterProviders = function (key) {
        if (key.which === 13) {
            $scope.searchProviders();
        }
    };
    $scope.enterSupporters = function (key) {
        if (key.which === 13) {
            $scope.searchSupporters();
        }
    };

    // check if user already exists
    var alreadySelected = function (id, selected) {
        var i = selected.length;
        while (i--) {
            var selectedId = selected[i].UserId;
            if (id.localeCompare(selectedId) === 0) {
                return true;
            }
        }
        return false;
    };
}]);
