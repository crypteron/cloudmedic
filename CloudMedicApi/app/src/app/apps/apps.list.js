angular.module('cloudmedic.apps.list', ['ui.router', 'cloudmedic.resources'])
.config(['$stateProvider', function config($stateProvider) {
    $stateProvider    
    .state('apps.list', {
        url: '',
        views: {
            "main@": {
                controller: 'AppsListCtrl',
                templateUrl: 'apps/apps.list.tpl.html'
            }
        },
        resolve: {
            apps: ["Apps", function (Apps) {
                return Apps.query().$promise;
            }]
        },
        data: { pageTitle: 'Apps' }
    });
}])
.controller('AppsListCtrl', ['$scope', 'apps', '$state', function ($scope, apps, $state) {
    $scope.apps = apps;
    $scope.viewAppDetails = function (app) {
        $state.go('apps.detail', { appId: app.AppId });
    };
}]);