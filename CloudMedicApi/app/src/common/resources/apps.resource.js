angular.module('apps.resource', ['ngResource'])
.provider('Apps', function () {
    var provider = this;
    provider.apiUrl = '';
    provider.setApiUrl = function(apiUrl){
        provider.apiUrl = apiUrl;
    };

    provider.$get = ['$resource', function($resource){
        var service = $resource(provider.apiUrl + 'apps/:appId',{},{
            'query': { method: 'GET', isArray: true },
            'get': { method: 'GET', isArray: false },
            'save': { method: 'PUT', isArray: false, params: { appId: "@AppId" } },
            'remove': { method: 'DELETE', isArray: false, params: { appId: "@AppId" } },
            'create': { method: 'POST', isArray: false }
        });
        return service;
    }];
});