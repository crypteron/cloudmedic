
angular.module('cloudmedic.keys.add', ['ui.router', 'cloudmedic.resources', 'ui.bootstrap'])
.config(['$stateProvider', function config($stateProvider) {
    $stateProvider
    .state("apps.detail.addKey", {
        url: "/addsecpart",
        onEnter: ['$modal', function ($modal) {
            $modal.open({
                templateUrl: "keys/keys.add.tpl.html",
                controller: 'AddKeyCtrl'
            });
        }]
    });
}])
.controller('AddKeyCtrl', ['$scope', '$state', '$stateParams', 'Keys', 'localizedNotifications', '$modalInstance', function ($scope, $state, $stateParams, Keys, localizedNotifications, $modalInstance) {
    $scope.key = new Keys({ AppId: $stateParams.appId });
    $scope.data = {
        isSubmitting: false
    };

    $scope.save = function () {
        $scope.data.isSubmitting = true;
        localizedNotifications.removeForCurrent();
        $scope.key.$create().then(function () {
            localizedNotifications.addForNext('create.success', 'success', { entityType: 'Security Partition' });
            $modalInstance.close();            
        }, function () {
            $scope.data.isSubmitting = false;
        });
    };

    $modalInstance.result.then(function () {
        $state.go("apps.detail", $stateParams, { reload: true });
    }, function () {
        return $state.go("apps.detail", $stateParams);
    });
}]);