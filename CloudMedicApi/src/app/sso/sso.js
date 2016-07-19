angular.module('cloudmedic.sso', ['ui.router'])
.config(['$stateProvider', function config($stateProvider) {
    $stateProvider
    .state('sso', {
        url: '/sso/{ssoProvider}/token/{token}/userName/{userName}/app/{appId}',
        views: {
            "main": {
                controller: 'SsoCtrl',
                templateUrl: 'sso/sso.login.tpl.html'
            }
        },
        data: {
            pageTitle: 'Logging You Automatically',
            hideNav: true,
            bodyClass: 'login',
            public: true
        }
    });
}])
.controller('SsoCtrl', ['$scope', 'auth', '$state', '$stateParams', 'localizedNotifications', function ($scope, auth, $state, $stateParams, localizedNotifications) {
    $scope.ssoProvider = auth.ssoProviders[$stateParams.ssoProvider].label;

    auth.loginWithSso({
        ssoProvider: $stateParams.ssoProvider,
        token: $stateParams.token,
        userName: $stateParams.userName
    });

    $state.go('apps.detail', { appId: $stateParams.appId });
}]);