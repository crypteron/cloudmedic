angular.module('auth.interceptor', ['localizedNotifications', 'auth.service', 'ui.router'])
.factory('authInterceptor', ['$q', '$injector', 'localizedNotifications', function ($q, $injector, localizedNotifications) {
    // We must use $injector to get auth service to prevent circular dependancy
    var auth = {};
    var $state = {};

    // helper functions for starts with and ends with
    var _startsWith = function (str, prefix) {
        return str.toLowerCase().slice(0, prefix.length) == prefix;
    };

    var _endsWith = function (str, suffix) {
        return str.toLowerCase().indexOf(suffix.toLowerCase(), str.length - suffix.length) !== -1;
    };

    var _isEndpointExcluded = function (url) {
        for (var i = 0, len = auth.excludeEndpoints.length; i < len; i++) {
            var endpoint = auth.excludeEndpoints[i];
            if (url.match(endpoint)) {
                return true;
            }
        }
        return false;
    };

    // Callback for handling requests.  If attempting to call any API method besides login, either enforce login
    // or inject the token into the request.
    var _request = function (config) {
        config.headers = config.headers || {};
        auth = $injector.get('auth');
        if (_startsWith(config.url, auth.apiUrl) && !_isEndpointExcluded(config.url)) {
            if (auth.status.isLoggedIn) {
                config.headers.Authorization = 'Bearer ' + auth.status.token.access_token;
            } else {
                // Necessary to cancel request
                var cancel = $q.defer();
                config.timeout = cancel.promise;
                cancel.resolve();

                // Redirect user to login
                $state = $injector.get('$state');
                $stateParams = $injector.get('$stateParams');
                localizedNotifications.addForNext('login.required.api', 'warning');
                if ($state.current.name != auth.loginState) {
                    auth.setRedirectState($state.current.name, $stateParams);
                }
                $state.go(auth.loginState, null, { reload: true });

                // Cancel request
                return $q.when(config);
            }
        }
        return config;
    };

    // Callback for error responses
    var _responseError = function (rejection) {
        auth = $injector.get('auth');
        $state = $injector.get('$state');
        $stateParams = $injector.get('$stateParams');
        if (rejection.status === 401) {
            if (auth.status.isLoggedIn) {
                // Login expired
                if ($state.current.name && $state.current.name != auth.loginState) {
                    auth.setRedirectState($state.current.name, $stateParams);
                }
                localizedNotifications.removeAll();
                if (auth.status.ssoProvider == null) {
                    localizedNotifications.addForNext('login.expired', 'warning', null, null);

                } else {
                    localizedNotifications.addForNext('login.expired.sso', 'warning', { ssoProvider: auth.ssoProviders[auth.status.ssoProvider].label });
                }
                auth.logout(false);
                $state.go(auth.loginState, null, { reload: true });
            } else {
                // No longer show notification for logged out user since state change event shows a notification
                //localizedNotifications.add('login.required', 'warning', { pageTitle: $state.current.data.pageTitle }, null);
                $state.go(auth.loginState, null, { reload: true });
            }
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
    $httpProvider.interceptors.push('authInterceptor');
}]);
