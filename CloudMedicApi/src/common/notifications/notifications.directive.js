angular.module('notifications.directive', ['notifications.service'])
.directive('cmNotificationBar', ['notifications', function (notifications) {
    var directive = {
        templateUrl: 'notifications/notifications.bar.tpl.html',
        restrict: 'E',
        replace: true,
        scope: true,        
        controller: ['$scope', function($scope){
            $scope.notifications = notifications;
            $scope.removeNotification = function (notification) {
                notifications.remove(notification);
            };
        }]
    };
    return directive;
}]);