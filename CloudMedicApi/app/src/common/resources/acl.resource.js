angular.module('acl.resource', ['ngResource'])
.provider('Acl', function () {
    var provider = this;
    provider.apiUrl = '';
    provider.setApiUrl = function (apiUrl) {
        provider.apiUrl = apiUrl;
    };

    provider.$get = ['$resource', function ($resource) {
        var acl = $resource(provider.apiUrl + 'keys/:keyId/acl/:aceId', {}, {
            query: { method: 'GET', isArray: true },
            get: { method: 'GET', isArray: false },
            update: { method: 'PUT', isArray: false, params: { keyId: "@KeyEntityId", aceId: "@AceId" } },
            create: { method: 'POST', isArray: true },
            remove: {method: 'DELETE', isArray: false}
        });
        return acl;

    
        
    }];
});