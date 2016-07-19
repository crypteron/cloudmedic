angular.module('cloudmedic.login.forgot', ['ui.router', 'cloudmedic.resources', 'ui.bootstrap'])
.config(['$stateProvider', function config($stateProvider) {
    $stateProvider
    .state("login.forgot", {
        url: "/forgot"
    })
    .state("login.forgot.username", {
        url: "/username",
        onEnter: ['$modal', function ($modal) {
            $modal.open({
                templateUrl: "login/login.forgot.username.tpl.html",
                controller: 'ForgotUsernameCtrl'
            });
        }]
    }).state("login.forgot.password", {
        url: "/password",
        onEnter: ['$modal', function ($modal) {
            $modal.open({
                templateUrl: "login/login.forgot.password.tpl.html",
                controller: 'ForgotPasswordCtrl'
            });
        }]
    });
}])
.controller('ForgotUsernameCtrl', ['$scope', 'notifications', '$state', '$stateParams', '$modalInstance', '$http', 'APP_CONFIG',
    function ($scope, notifications, $state, $stateParams, $modalInstance, $http, APP_CONFIG) {
        $scope.data = {
            isSubmitting: false,
            email: ''
        };

        $scope.forgotUsername = function () {
            notifications.removeForCurrent();
            $scope.data.isSubmitting = true;
            var forgotUsernameUrl = APP_CONFIG.api_url + 'account/forgotUsername';

            $http.post(forgotUsernameUrl, { email: $scope.data.email } ).
            success(function (data, status, headers, config) {
                notifications.addForNext({
                    type: 'success',
                    message: data
                });
                $modalInstance.close();
            }).
            error(function (data, status, headers, config) {
                $scope.data.isSubmitting = false;                
            });
        };

        $modalInstance.result.then(function () {
            $state.go("login", $stateParams);
        }, function () {
            return $state.go("login", $stateParams);
        });
    }
])
.controller('ForgotPasswordCtrl', ['$scope', 'notifications', '$state', '$stateParams', '$modalInstance', '$http', 'APP_CONFIG',
    function ($scope, notifications, $state, $stateParams, $modalInstance, $http, APP_CONFIG) {
        $scope.data = {
            isSubmitting: false,
            email: ''
        };

        $scope.forgotPassword = function () {
            notifications.removeForCurrent();
            $scope.data.isSubmitting = true;
            var forgotUsernameUrl = APP_CONFIG.api_url + 'account/forgotPassword';

            $http.post(forgotUsernameUrl, { UserName: $scope.data.username })
            .success(function (data, status, headers, config) {
                notifications.addForNext({
                    type: 'success',
                    message: data
                });
                $modalInstance.close();
            })
            .error(function (data, status, headers, config) {
                $scope.data.isSubmitting = false;               
            });
        };

        $modalInstance.result.then(function () {
            $state.go("login", $stateParams);
        }, function () {
            return $state.go("login", $stateParams);
        });
    }
]);