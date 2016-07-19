angular.module('cloudmedic.apps.add', [
        'ui.router',
        'cloudmedic.resources',
        'ui.bootstrap',
        'cloudmedic.dropdown.values'
    ])
    .config([
        '$stateProvider', function config($stateProvider) {
            $stateProvider
                .state("apps.list.add", {
                    url: "/add",
                    onEnter: [
                        '$modal', 'auth', '$state', function($modal, auth, $state) {
                            /*if (auth.status.ssoProvider != null) {
                                $state.go('apps.list', null, { notify: false });
                            }*/
                            $modal.open({
                                templateUrl: "apps/apps.add.tpl.html",
                                controller: 'AddAppCtrl',
                                resolve: {                                    
                                }
                            });
                        }
                    ]
                });
        }
    ])
    .controller('AddAppCtrl',
        ["$scope", "$state", "$stateParams", "Apps", "localizedNotifications", "$modalInstance", "DROPDOWN_PLANS", "$window", function($scope,
            $state,
            $stateParams,
            Apps,
            localizedNotifications,
            $modalInstance,
            DROPDOWN_PLANS,            
            $window) {
            $scope.app = new Apps({ PlanId: 0 });
            $scope.data = {
                isSubmitting: false
            };
            
            $scope.plans = DROPDOWN_PLANS;
            

            var createApp = function() {
                $scope.app.$create().then(function() {
                    localizedNotifications.addForNext('create.success', 'success', { entityType: 'App' });
                    $modalInstance.close();
                }, function() {
                    $scope.data.isSubmitting = false;
                });
            };

            $scope.save = function() {
                $scope.data.isSubmitting = true;
                localizedNotifications.removeForCurrent();
                createApp();
            };

            $modalInstance.result.then(function() {
                $state.go("apps.detail", { appId: $scope.app.AppId });
            }, function() {
                return $state.go('apps.list');
            });
        }]
    );