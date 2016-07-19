angular.module('cloudmedic.profile.update', [
    'ui.router',
    'cloudmedic.resources',
    'form'
])
.config(["$stateProvider", function config($stateProvider) {
    $stateProvider.state('profile', {
        url: '/profile',
        views: {
            "main": {
                controller: 'ProfileCtrl',
                templateUrl: 'profile/profile.update.tpl.html'
            }
        },
        data: {
            pageTitle: 'Profile'
        },
        resolve: {
            profile: ["userProfile", function (userProfile) {
                return userProfile.get().$promise;
            }]
        }
    });
}])
.controller('ProfileCtrl', ["$scope", "$state", "profile", "localizedNotifications", function ($scope, $state, profile, localizedNotifications) {
    $scope.data = {
        Username: "",
        Email: "",
        FirstName: "",
        LastName: "",
        isSubmitting: false
    };
    $scope.profile = profile;
    $scope.original = angular.copy($scope.profile);

    // Profile update
    $scope.updateProfile = function () {
        localizedNotifications.removeForCurrent();
        $scope.data.isSubmitting = true;
        $scope.profile.FirstName = capitalize($scope.profile.FirstName);
        $scope.profile.LastName = capitalize($scope.profile.LastName);
        $scope.profile.$post().then(function () {
            localizedNotifications.addForNext('update.success', 'success', { entityType: 'Profile' });
            $scope.data.isSubmitting = false;
            $scope.form.$setPristine();
            $state.go("profile", null, { reload: true });
        }, function () {
            $scope.data.isSubmitting = false;
        });
    };
    $scope.resetProfile = function () {
        $scope.profile.Username = $scope.original.Username;
        $scope.profile.Email = $scope.original.Email;
        $scope.profile.LastName = $scope.original.LastName;
        $scope.profile.FirstName = $scope.original.FirstName;
        $scope.form.$setPristine();
        $scope.Username_Valid_length = true;
        $scope.Username_Valid_symbol = true;
        $scope.Firstname_Valid = true;
        $scope.Lastname_Valid = true;
    };

    // Name validation
    $scope.Firstname_Valid = true;
    $scope.Lastname_Valid = true;

    $scope.check_firstName = function () {
        if (document.getElementById("user-first").value.match(/[^a-zA-Z]/) != null) {
            $scope.Firstname_Valid = false;
        }
        else {
            $scope.Firstname_Valid = true;
        }
    };
    $scope.check_lastName = function () {
        if (document.getElementById("user-last").value.match(/[^a-zA-Z]/) != null) {
            $scope.Lastname_Valid = false;
        }
        else {
            $scope.Lastname_Valid = true;
        }
    };

    // Username validation
    $scope.Username_Valid_length = true;
    $scope.Username_Valid_symbol = true;
    $scope.check_username = function () {
        // Check UserName for symbols
        if (document.getElementById("user-username").value.match(/[^0-9a-zA-Z]/) != null) {
            $scope.Username_Valid_symbol = false;
        }
        else {
            $scope.Username_Valid_symbol = true;
        }
        // Check UserName for length
        if (document.getElementById("user-username").value.length < 3 || document.getElementById("user-username").value.length > 20) {
            $scope.Username_Valid_length = false;
        }
        else {
            $scope.Username_Valid_length = true;
        }
    };
}]);

function capitalize(input) {
    if (input != null) {
        input = input.toLowerCase();
    }
    return input.substring(0, 1).toUpperCase() + input.substring(1);
}