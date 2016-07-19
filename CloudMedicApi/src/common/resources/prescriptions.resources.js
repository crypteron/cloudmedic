angular.module('prescriptions.resource', ['ngResource'])
.provider('Prescriptions', function () {
    var provider = this;
    provider.apiUrl = '';
    provider.setApiUrl = function (apiUrl) {
        provider.apiUrl = apiUrl;
    };

    provider.$get = function ($resource) {
        var service = $resource(provider.apiUrl + 'prescriptions/:path', {}, {
            'query': { method: 'GET', isArray: true },
            'remove': { method: 'DELETE', isArray: false },
            'create': { method: 'POST', isArray: false, params: { path: 'Add' } },
            'update': { method: 'POST', isArray: false, params: { path: 'Update' } }
        });
        return service;
    };
});