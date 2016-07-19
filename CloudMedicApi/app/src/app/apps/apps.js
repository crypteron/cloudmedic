angular.module('cloudmedic.apps', ['cloudmedic.apps.list', 'cloudmedic.apps.detail', 'cloudmedic.apps.add'])
.config(['$stateProvider', function config($stateProvider) {
    $stateProvider
    .state('apps', {
        abstract: true,
        url: '/apps',
        template: "",
        data: {}
    });
}]);