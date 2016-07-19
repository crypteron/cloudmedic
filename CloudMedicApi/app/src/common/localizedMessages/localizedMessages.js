// Service for looking up, interpolating and returning localized messages for notifications
angular.module('localizedMessages', [])
.provider('localizedMessages', function () {
    // Provider Properties
    var provider = this;
    provider.messages = {};

    // Provider Configuration
    // To configure this service, provide it an object containing the localized messages
    provider.setMessages = function (messages) {
        provider.messages = messages;
    };

    // Factory
    provider.$get = ['$interpolate', function ($interpolate) {
        var _messages = provider.messages;

        // Methods
        // Get method for doing the look up and interpolation
        var _get = function (msgKey, interpolateParams) {
            var msg = _messages[msgKey];
            if (msg) {
                return $interpolate(msg)(interpolateParams);
            } else {
                return false;  // TODO: maybe do something else besides return false?
            }
        };

        var _add = function (messages) {
            _messages = angular.extend(_messages, messages);
        };

        var _addIfNotExists = function (messages) {
            _messages = angular.extend(messages, _messages);
        };

        // Public API
        var service = {
            get: _get,
            add: _add,
            addIfNotExists: _addIfNotExists
        };

        return service;
    }];
});