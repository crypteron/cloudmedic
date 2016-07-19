
angular.module('cloudmedic.keys.detail', ['ui.router', 'cloudmedic.resources', 'xeditable', 'ui.bootstrap'])
.config(['$stateProvider', function config($stateProvider) {
    $stateProvider
    .state('apps.detail.key', {
        url: '/secpart/{keyId:[0-9]+}',
        views: {
            'main@': {
                controller: 'ViewKeyCtrl',
                templateUrl: 'keys/keys.detail.tpl.html'
            },
            'acl@apps.detail.key': {
                controller: 'ViewAclCtrl',
                templateUrl: 'acl/acl.list.tpl.html',
                resolve: {
                    acl: ['key', 'Acl', function (key, Acl) {
                        return Acl.query({ keyId: key.KeyId }).$promise;
                    }]
                }
            }
        },
        resolve: {
            key: ['Keys', '$stateParams', function (Keys, $stateParams) {
                return Keys.get({ keyId: $stateParams.keyId }).$promise;
            }]
        },
        data: { pageTitle: 'Key' }
    });
}])
.controller('ViewKeyCtrl', ['$scope', 'key', '$state', '$modal', 'localizedNotifications', 'localizedMessages', function ($scope, key, $state, $modal, localizedNotifications, localizedMessages) {
    $scope.key = key;
    $scope.oldKey = {};

    $scope.updateKey = function () {
        localizedNotifications.removeForCurrent();
        $scope.key.$update().then(function () {
            localizedNotifications.addForCurrent('update.success', 'success', { entityType: 'Security Partition' });
        }, function () {
            $scope.key = $scope.oldKey;
        });
    };

    $scope.copyKey = function () {
        $scope.oldKey = angular.copy($scope.key);
    };
    
    $scope.deleteKey = function () {
        localizedNotifications.removeForCurrent();
        $modal.open({
            templateUrl: "app.confirm.tpl.html",
            controller: ['$scope', function ($scope) {
                $scope.confirmText = "You will not be able to recover this Security Partion!";
                $scope.confirmButton = "Yes, delete Security Partition!";
            }]
        }).result.then(function () {
                $scope.key.$remove().then(function () {
                    localizedNotifications.addForNext('delete.success', 'success', { entityType: 'Security Partition'});
                    $state.go('apps.detail', { appId: $scope.key.AppId }, { reload: true });
                });
            });
    };

    $scope.refreshKey = function () {
        localizedNotifications.removeForCurrent();
        $modal.open({
            templateUrl: "app.confirm.tpl.html",
            controller: ['$scope', function ($scope) {
                $scope.confirmText = localizedMessages.get('key.refresh.instructions');
                $scope.confirmButton = localizedMessages.get('key.refresh.confirm');
            }]
        }).result.then(function () {
                $scope.key.$create({ updateExisting: 1 }).then(function () {
                    localizedNotifications.addForNext('key.refresh.success', 'success', { SecPartId: $scope.key.SecPartId });
                    $state.go('apps.detail.key', { keyId: $scope.key.KeyId }, { reload: true });
                });
            });
    };
}]);