// A service for keeping track of notification messages such as alerts and notices
angular.module('notifications.service', [])
.factory('notifications', ['$rootScope', function ($rootScope) {
    // Properties
    // Container containing collections of notifications.  
    // Sticky notifications remain on screen until manually dismissed
    // Current_state notifications remain until the user navigates to a different state
    // Next_state notifications appear on the next state and then become current_state notifications

    // Sample notification: {type: 'info', message: 'some notification message'} 
    var _notifications = {
        sticky: [],
        current_state: [],
        next_state: []
    };

    // Events
    // On state change, remove the current state's notifications and move the next state's notifications to the current one
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        _notifications.current_state.length = 0; // clear current state's notifications
        _notifications.current_state = angular.copy(_notifications.next_state); // move next state's notifications to current
        _notifications.next_state.length = 0; // clear next state's notifications
    });
    
    // Methods
    // Generic helper method for adding different notifications
    var _add = function (duration, notification) {
        _notifications[duration].push(notification);
        return _notifications;
    };

    // Add a sticky notification
    var _addSticky = function (notification) {
        return _add('sticky', notification);
    };

    // Add a notification for the current state
    var _addForCurrent = function (notification) {
        return _add('current_state', notification);
    };

    // Add a notification for the next state
    var _addForNext = function (notification) {
        return _add('next_state', notification);
    };

    // get all the sticky notifications as well as those for this state
    var _get = function () {
        return [].concat(_notifications.sticky, _notifications.current_state);
        
    };

    // Remove the specified notification
    var _remove = function (notification) {
        angular.forEach(_notifications, function (notificationsByType) {
            var i = notificationsByType.indexOf(notification);
            if (i > -1) {
                notificationsByType.splice(i, 1);
            }
        });
        
        return _notifications;
    };

    // Remove notifications on the current state
    var _removeForCurrent = function () {
        _notifications.current_state.length = 0;
    };

    var _removeAll = function () {
        angular.forEach(_notifications, function (notificationsByType) {
            notificationsByType.length = 0;
        });
    };

    

    // Service
    var service = {
        addSticky: _addSticky,
        addForCurrent: _addForCurrent,
        addForNext: _addForNext,
        remove: _remove,
        removeForCurrent: _removeForCurrent,
        removeAll: _removeAll,
        get: _get
    };
    return service;

}]);
