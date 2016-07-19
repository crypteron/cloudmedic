
angular.module('cloudmedic.apps.detail', [
    'ui.router',
    'cloudmedic.resources',
    'cloudmedic.dropdown.values',
    'xeditable'    
])
.config(['$stateProvider', function config($stateProvider) {
    $stateProvider    
    .state('apps.detail', {
        url: '/{appId:[0-9]+}',
        views: {
            "main@": {
                controller: 'AppsDetailCtrl',
                templateUrl: 'apps/apps.detail.tpl.html'
            }
        },
        resolve: {
            app: ['$stateParams', 'Apps', function ($stateParams, Apps) {
                return Apps.get({ appId: $stateParams.appId }).$promise;
            }],
            keys: ['app', 'Keys', function (app, Keys) {
                return Keys.query({ appId: app.AppId }).$promise;
            }]            
        },
        data: { pageTitle: 'App Details' }
    });
}])
.controller('AppsDetailCtrl',["$scope", "app", "keys", "$state", "localizedNotifications", "auth", "DROPDOWN_PLANS", "$modal", "$window", "$filter", function ($scope, app, keys, $state, localizedNotifications, auth, DROPDOWN_PLANS, 
    $modal, $window, $filter) {
    var data = {
        secretHidden: true
    };

    $scope.app = app;
    $scope.keys = keys;
    $scope.data = data;
    $scope.authStatus = auth.status;
    $scope.oldApp = {};
    $scope.plans = DROPDOWN_PLANS;

    $scope.showSecret = function (download) {
        $window.prompt("Copy to clipboard, Ctrl-C", $scope.app.AppSecret);
    };


    // Methods
    var getPlanDetails = function (id) {
        return $filter('filter')($scope.plans, function (plan) { return plan.value == id; })[0];
    };
    $scope.toggleSecret = function () {
        $scope.data.secretHidden = !$scope.data.secretHidden;
    };

    $scope.viewKey = function (key) {
        $state.go('apps.detail.key', { keyId: key.KeyId });
    };

    $scope.copyApp = function () {
        $scope.oldApp = angular.copy($scope.app);
    };

    $scope.renameApp = function () {
        localizedNotifications.removeForCurrent();
        $scope.app.$save().then(function () {
            localizedNotifications.addForCurrent('rename.success', 'success', { entityType: 'App' });
        }, function () {
            $scope.app = $scope.oldApp;
        });
    };

    // Helper method for saving plan
    var savePlan = function () {
        $scope.app.$save().then(function () {
            
            localizedNotifications.addForCurrent('update.success', 'success', { entityType: 'Plan' });
        }, function (error) {
            // localizedNotifications.addForNext('update.error', 'danger', { entityType: 'Plan', updateError: error.data.Message });
            $scope.app = $scope.oldApp;
        });
    };

    // When user updates plan
    $scope.updatePlan = function () {        
        localizedNotifications.removeForCurrent();
        savePlan();        
    };

    $scope.addKey = function () {
        $state.go('apps.detail.addKey');
    };

    $scope.deleteApp = function () {
        localizedNotifications.removeForCurrent();
        $modal.open({
            templateUrl: "app.confirm.tpl.html",
            controller: ['$scope', function ($scope) {
                $scope.confirmText = "You will not be able to recover this App or any of its Security Partions!";
                $scope.confirmButton = "Yes, delete App!";
            }]
        }).result.then(function () {
            $scope.app.$remove().then(function () {
                localizedNotifications.addForNext('delete.success', 'success', { entityType: 'App' });
                $state.go('apps.list', null, { reload: true });
            });
        });
    };
}]);