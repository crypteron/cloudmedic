angular.module('cloudmedic.login.resendVerify', ['ui.router', 'cloudmedic.resources', 'ui.bootstrap'])
.config(['$stateProvider', function config($stateProvider) {
    $stateProvider
    .state("login.resendVerify", {
        url: "/resendVerify",
        onEnter: ['$modal', function ($modal) {
            $modal.open({
                templateUrl: "login/login.resendVerify.tpl.html",
                controller: 'ResendVerifyCtrl'
            });
        }]
    });
}])
.controller('ResendVerifyCtrl', ['$scope', 'notifications', '$state', '$stateParams', '$modalInstance', '$http', 'APP_CONFIG',
    function ($scope, notifications, $state, $stateParams, $modalInstance, $http, APP_CONFIG) {
        $scope.data = {
            isSubmitting: false,
            email: ''
        };

        $scope.resendVerify = function () {
            notifications.removeForCurrent();
            $scope.data.isSubmitting = true;
            var resendUsernameUrl = APP_CONFIG.api_url + 'account/resendVerify';

            $http.post(resendUsernameUrl, { email: $scope.data.email }).
            success(function (data, status, headers, config) {
                notifications.addForNext({
                    type: 'success',
                    message: data
                });
                $modalInstance.close();
            }).
            error(function (data, status, headers, config) {
                $scope.data.isSubmitting = false;
                notifications.addForCurrent({
                    type: 'danger',
                    message: data
                });
            });
        };

        $modalInstance.result.then(function () {
            $state.go("login", $stateParams);
        }, function () {
            return $state.go("login", $stateParams);
        });
    }
]);