angular.module('password.resource', ['ngResource'])
.provider('Password', function () {
    var provider = this;
    provider.apiUrl = '';
    provider.setApiUrl = function (apiUrl) {
        provider.apiUrl = apiUrl;
    };

    provider.$get = ['$resource', function ($resource) {
        var Password = $resource(provider.apiUrl + 'account/ChangePassword', {}, {
            update: { method: 'POST', isArray: false }
        });
        return Password;
    }];
});