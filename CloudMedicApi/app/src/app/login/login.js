angular.module('cloudmedic.login', [
    'cloudmedic.login.forgot',
    'cloudmedic.login.resetPassword',
    'cloudmedic.login.resendVerify',
    'ui.router',
    'auth',
    'localizedNotifications'
]).config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('login', {
        url: '/login',
        views: {
            "main": {
                controller: 'LoginCtrl',
                templateUrl: 'login/login.tpl.html'
            }
        },
        data: {
            pageTitle: 'Login',
            hideNav: true,
            bodyClass: 'login',
            public: true
        }
    })
    .state('login.verify', {
        url: '/verify'
    })
    .state('login.verify.success', {
        url: '/success',
        data: {
            notification: {
                message: 'login.verify.success',
                type: 'success'
            }
        }
    })
    .state('login.verify.error', {
        url: '/error',
        data: {
            notification: {
                message: 'login.verify.error',
                type: 'danger'
            }
        }
    });
}])
.controller('LoginCtrl', ["$scope", "auth", "$state", "localizedNotifications", "userProfile", function ($scope, auth, $state, localizedNotifications, userProfile) {
    
    // If user is already logged in, navigate to apps state
    if (auth.status.isLoggedIn) {
        if (auth.status.token.userRole.contains('SysAdmin')) {
            $state.go('admin');
        } else if (auth.status.token.userRole.contains('Patient')) {
            $state.go('patient');
        } else if (auth.status.token.userRole.contains('Supporter')) {
            $state.go('supporter');
        } else {
            $state.go('provider');
        }
    }

    // Initialize scope variables
    $scope.authError = null;
    $scope.loginData = {
        username: "",
        password: "",
        isSubmitting: false
    };
    $scope.ssoProviders = auth.ssoProviders;

    $scope.notification = $state.current.data.notification;
    if ($scope.notification) {
        localizedNotifications.addForCurrent($scope.notification.message, $scope.notification.type);
    }

    // Login method
    $scope.login = function () {
        console.log("Executing login method in login.js");
        $scope.loginData.isSubmitting = true;
        localizedNotifications.removeForCurrent();
        auth.login($scope.loginData)
        .then(function (response) {
            if (auth.status.token.userRole.contains('SysAdmin')) {
                auth.redirectAfterLogin('admin');
            }
            else if (auth.status.token.userRole.contains('Patient')) {
                auth.redirectAfterLogin('patient');
            }
            else if (auth.status.token.userRole.contains('Supporter')) {
                auth.redirectAfterLogin('supporter');
            } else {
                auth.redirectAfterLogin('provider');
            }
        },
        function (err) {
            $scope.loginData.password = "";
            $scope.loginData.isSubmitting = false; // re-enable submit button
        });
    };
}]
);