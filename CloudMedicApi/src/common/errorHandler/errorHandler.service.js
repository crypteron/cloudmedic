angular.module('errorHandler.service', ['notifications'])
.factory('errorInterceptor', ['$q', '$injector', 'notifications', 'localizedMessages', function ($q, $injector, notifications, localizedMessages) {
    var _request = function (config) {
        return config;
    };

    var _responseError = function (rejection) {
        if (rejection.status !== 401) {
            var errorMessages = [];
            if (rejection.hasOwnProperty('data') && rejection.data != null) {
                if (rejection.data.hasOwnProperty('Message')) {
                    errorMessages.push(rejection.data.Message);
                    if (rejection.data.hasOwnProperty('ModelState')) {
                        angular.forEach(rejection.data.ModelState, function (field) {
                            angular.forEach(field, function (error) {
                                errorMessages.push(error);
                            });
                        });
                    }
                }
                else if (rejection.data.hasOwnProperty('error_description')) {
                    errorMessages.push(rejection.data.error_description);
                }
                else {
                    errorMessages.push(localizedMessages.get('unknown_error'));
                }
            }
            else {
                errorMessages.push(localizedMessages.get('unknown_error'));                
            }
            notifications.addForCurrent({ type: 'danger', message: errorMessages.join('<br/>') });
        }
        return $q.reject(rejection);
    };

    // Service
    var service = {
        request: _request,
        responseError: _responseError
    };

    return service;
}])
.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('errorInterceptor');
}]);