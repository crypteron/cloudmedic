angular.module('form', [
    'ui.router',
    'ui.mask',
    'cloudmedic.resources'
])
.controller('FormCtrl', ["$scope", "$filter", "Users", "Password", "Registration", "$state", "localizedNotifications", function ($scope, $filter, Users, Password, Registration, $state, localizedNotifications) {
    // Initialize scope variables
    $scope.data = {
        Role: "",
        PhoneNumber: "",
        isSubmitting: false
    };
    $scope.supporter = false;
    $scope.creator = new Users();
    $scope.password = new Password();
    $scope.registration = new Registration();

    // Patient registration
    $scope.register = function () {
        $scope.data.isSubmitting = true;
        $scope.registration.FirstName = capitalize($scope.registration.FirstName);
        $scope.registration.LastName = capitalize($scope.registration.LastName);
        $scope.registration.Specialty = "";
        $scope.registration.DOB = $filter('date')($scope.dt, 'M/d/yyyy h:mm:ss a', '+000');
        $scope.registration.PhoneNumber = '(' + $scope.data.PhoneNumber.substr(0, 3) + ') ' + $scope.data.PhoneNumber.substr(3, 3) + '-' + $scope.data.PhoneNumber.substr(6, 4);
        $scope.registration.$register().then(function (response) {
            $state.go('login');
        },
        function (err) {
            $scope.data.isSubmitting = false;
        });
    };

    // Physician/Nurse/Supporter creation
    $scope.create = function () {
        localizedNotifications.removeForCurrent();
        $scope.data.isSubmitting = true;
        $scope.creator.FirstName = capitalize($scope.creator.FirstName);
        $scope.creator.LastName = capitalize($scope.creator.LastName);
        $scope.creator.PhoneNumber = '(' + $scope.data.PhoneNumber.substr(0, 3) + ') ' + $scope.data.PhoneNumber.substr(3, 3) + '-' + $scope.data.PhoneNumber.substr(6, 4);
        if ($scope.data.Role != "Physician" && $scope.data.Role != "Nurse") {
            $scope.creator.Roles = ["Supporter"];
        }
        else {
            $scope.creator.Roles = [$scope.data.Role];
        }
        $scope.creator.Specialty = "";
        $scope.creator.DOB = $filter('date')($scope.dt, 'M/d/yyyy h:mm:ss a', '+000');

        $scope.creator.$create().then(function (response) {
            localizedNotifications.addForNext('create.success', 'success', { entityType: 'User' });
            $scope.$close();
        }, function (err) {
            $scope.data.isSubmitting = false;
        });
    };

    // Password update
    $scope.changePassword = function () {
        localizedNotifications.removeForCurrent();
        $scope.password.$update().then(function () {
            localizedNotifications.addForNext('update.success', 'success', { entityType: 'Password' });
            $scope.$close();
        }, function () {
            $scope.data.isSubmitting = false;
        });
    };

    // Username validation
    $scope.Username_Valid_length = true;
    $scope.Username_Valid_symbol = true;
    $scope.check_username = function () {
        // Check UserName for symbols
        if (document.getElementById("register-username").value.match(/[^0-9a-zA-Z]/) != null) {
            $scope.Username_Valid_symbol = false;
        }
        else {
            $scope.Username_Valid_symbol = true;
        }
        // Check UserName for length
        if (document.getElementById("register-username").value.length < 3 || document.getElementById("register-username").value.length > 20) {
            $scope.Username_Valid_length = false;
        }
        else {
            $scope.Username_Valid_length = true;
        }
    };

    // Password validation
    $scope.Password_Valid = true;
    $scope.Password_Short = false;
    $scope.Password_Digit = true;
    $scope.Password_Upper = true;
    $scope.Password_Lower = true;
    $scope.Password_Special = true;
    $scope.check_password = function () {
        if (document.getElementById("user-password").value.length < 6) {
            $scope.Password_Short = true;
        } else {
            $scope.Password_Short = false;
        }
        if (document.getElementById("user-password").value.match('[0-9]') === null) {
            $scope.Password_Digit = false;
        } else {
            $scope.Password_Digit = true;
        }
        if (document.getElementById("user-password").value.match('[A-Z]') === null) {
            $scope.Password_Upper = false;
        } else {
            $scope.Password_Upper = true;
        }
        if (document.getElementById("user-password").value.match('[a-z]') === null) {
            $scope.Password_Lower = false;
        } else {
            $scope.Password_Lower = true;
        }
        if (document.getElementById("user-password").value.match('[^A-Za-z0-9]') === null) {
            $scope.Password_Special = false;
        } else {
            $scope.Password_Special = true;
        }
        if ($scope.Password_Short || !$scope.Password_Digit || !$scope.Password_Upper || !$scope.Password_Lower || !$scope.Password_Special) {
            $scope.Password_Valid = false;
        } else {
            $scope.Password_Valid = true;
        }
    };

    // Check that the passwords match
    $scope.Passwords_Match = true;
    $scope.compare_passwords = function () {
        if (document.getElementById("user-password").value != (document.getElementById("user-confirmpassword").value)) {
            $scope.Passwords_Match = false;
        } else {
            $scope.Passwords_Match = true;
        }
    };

    // Name Validation
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

    // Date Picker 
    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };
    $scope.format = 'yyyy-MM-dd';
    $scope.dateOptions = {
        showWeeks: false
    };

}])
.directive('watchChange', function () {
    return {
        scope: {
            onchange: '&watchChange'
        },
        link: function (scope, element, attrs) {
            element.on('input', function () {
                scope.$apply(function () {
                    scope.onchange();
                });
            });
        }
    };
});

function capitalize(input) {
    if (input != null)
    {
        input = input.toLowerCase();
    }
    return input.substring(0, 1).toUpperCase() + input.substring(1);
}

function DateToUTC(date) {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
}