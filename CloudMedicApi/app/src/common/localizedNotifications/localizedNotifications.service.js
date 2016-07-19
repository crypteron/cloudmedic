// An extension of the notification services that adds localization and interpolation support
angular.module('localizedNotifications.service', ['notifications', 'localizedMessages'])
.factory('localizedNotifications', ['notifications', 'localizedMessages', function (notifications, localizedMessages) {
    // Methods
    // Prepare a notification before storing it. 
    var _prepareNotification = function (msgKey, type, interpolateParams, otherProperties) {
        var msg = localizedMessages.get(msgKey, interpolateParams); // get message and interpolate it
        var notification = { message: msg, type: type }; // create the notification
        notification = angular.extend(notification, otherProperties); // optionally extend it
        return notification;
    };

    var _addSticky = function (msgKey, type, interpolateParams, otherProperties) {
        var notification = _prepareNotification(msgKey, type, interpolateParams, otherProperties);
        return notifications.addSticky(notification);
    };

    var _addForCurrent = function (msgKey, type, interpolateParams, otherProperties) {
        var notification = _prepareNotification(msgKey, type, interpolateParams, otherProperties);
        return notifications.addForCurrent(notification);
    };

    var _addForNext = function (msgKey, type, interpolateParams, otherProperties) {
        var notification = _prepareNotification(msgKey, type, interpolateParams, otherProperties);
        return notifications.addForNext(notification);
    };

    var _remove = function (notification) {
        return notifications.remove(notification);
    };

    var _removeForCurrent = function () {
        return notifications.removeForCurrent();
    };

    var _removeAll = function () {
        notifications.removeAll();
    };

    var _get = function () {
        return notifications.get();
    };

    var service = {
        addSticky: _addSticky,
        addForCurrent: _addForCurrent,
        addForNext: _addForNext,
        remove: _remove,
        removeAll: _removeAll,
        get: _get,
        removeForCurrent: _removeForCurrent
    };

    return service;
}]);