angular.module('users.resource', ['ngResource'])
.provider('Users', function () {
    var provider = this;
    provider.apiUrl = '';
    provider.setApiUrl = function (apiUrl) {
        provider.apiUrl = apiUrl;
    };

    provider.$get = function ($resource) {
        var service = $resource(provider.apiUrl + 'users', {}, {
            'query': { method: 'GET', isArray: true },
            'get': { method: 'GET', isArray: false },
            'save': { method: 'PUT', isArray: false, params: { id: "@UserId" } },
            'remove': { method: 'DELETE', isArray: false, params: { id: "@UserId" } },
            'create': { method: 'POST', isArray: false }
        });
        return service;
    };
});