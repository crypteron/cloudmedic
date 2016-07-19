angular.module('cloudmedic.login.resetPassword', ['ui.router', 'cloudmedic.resources', 'ui.bootstrap'])
.config(['$stateProvider', function config($stateProvider) {
    $stateProvider
    .state("login.resetPassword", {
        url: "/resetPassword?userId&token",
        onEnter: ['$modal', function ($modal) {
            $modal.open({
                templateUrl: "login/login.resetPassword.tpl.html",
                controller: 'ResetPasswordCtrl'
            });
        }]
    });
}])
.controller('ResetPasswordCtrl', ['$scope', 'notifications', '$state', '$stateParams', '$modalInstance', '$http', 'APP_CONFIG',
    function ($scope, notifications, $state, $stateParams, $modalInstance, $http, APP_CONFIG) {
        $scope.data = {
            isSubmitting: false,
            newPassword: '',
            confirmPassword: ''
        };

        $scope.resetPassword = function () {
            notifications.removeForCurrent();
            $scope.data.isSubmitting = true;
            var resetPasswordUrl = APP_CONFIG.api_url + 'account/resetPassword';

            $http.post(resetPasswordUrl, {
                UserId: $stateParams.userId,
                Token: $stateParams.token,
                NewPassword: $scope.data.newPassword,
                ConfirmPassword: $scope.data.confirmPassword
            }).success(function (data, status, headers, config) {
                notifications.addForNext({
                    type: 'success',
                    message: data
                });
                $modalInstance.close();
            })
            .error(function (data, status, headers, config) {
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