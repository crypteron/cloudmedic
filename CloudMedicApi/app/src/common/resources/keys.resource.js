angular.module('keys.resource', ['ngResource'])
.provider('Keys', function () {
    var provider = this;
    provider.apiUrl = '';
    provider.setApiUrl = function (apiUrl) {
        provider.apiUrl = apiUrl;
    };

    provider.$get = ['$resource', function ($resource) {
        var Keys = $resource(provider.apiUrl + 'keys/:keyId', {}, {
            query: { method: 'GET', isArray: true },
            get: { method: 'GET', isArray: false },
            update: {method: 'PUT', isArray: false, params:{keyId:"@KeyId"}},
            create: { method: 'POST', isArray: false },
            remove: {method: 'DELETE', isArray: false, params:{keyId:"@KeyId"}}
        });
        return Keys;
    }];
});