angular.module('cloudmedic.supporter.invite', [
    'ui.router', 
    'cloudmedic.resources', 
    'ui.bootstrap'
])
.config(["$stateProvider", function config($stateProvider) {
    $stateProvider.state("patient.invite", {
        url: "/invite",
        onEnter: ["$modal", function ($modal) {
            $modal.open({
                templateUrl: "supporter/supporter.invite.tpl.html",
                controller: 'InviteSupporterCtrl'
            });
        }]
    });
}])
.controller('InviteSupporterCtrl', ["$scope", "$state", "$stateParams", "$modalInstance", "Users", "auth", "localizedNotifications", function($scope, $state, $stateParams, $modalInstance, Users, auth, localizedNotifications) {
    // Initialize scope variables
    $scope.data = {
        isSubmitting: false
    };
    $scope.Inviter = new Users();

    $scope.inviteSupporter = function () {
        localizedNotifications.removeForCurrent();
        $scope.data.isSubmitting = true;
        $scope.Inviter.PatientId = auth.status.token.userId;
        $scope.Inviter.$supporter().then(function () {
            localizedNotifications.addForNext('invite.success', 'success', { entityType: 'Supporter' });
            $modalInstance.close();
        }, function () {
            $scope.data.isSubmitting = false;
        });
    };

    $modalInstance.result.then(function () {
        $state.go("patient", $stateParams, { reload: true });
    }, function () {
        return $state.go("patient", $stateParams);
    });
}]);