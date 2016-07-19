angular.module('registration.resource', ['ngResource'])
.provider('Registration', function () {
    var provider = this;
    provider.apiUrl = '';
    provider.setApiUrl = function (apiUrl) {
        provider.apiUrl = apiUrl;
    };

    provider.$get = function ($resource) {
        var service = $resource(provider.apiUrl + 'Account/:path', {}, {
            'register': { method: 'POST', isArray: false, params: { path: 'Register' } },
            'supporter': { method: 'POST', isArray: false, params: { path: 'Supporter' } }
        });
        return service;
    };
});