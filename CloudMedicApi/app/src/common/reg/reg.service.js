angular.module('reg.service', ['ui.router', 'LocalStorageModule'])
.provider('reg', function () {
    var provider = this;
    provider.apiUrl = '';
    provider.registerPath = '';
    provider.assumePublic = true;
    provider.excludeEndpoints = [];

    // Provider configuration
    // Set the URL of the Register API
    provider.setApiUrl = function (apiUrl) {
        provider.apiUrl = apiUrl;
    };

    // Set whether or not states are assumed to be public or not
    provider.setAssumePublic = function (assumePublic) {
        provider.assumePublic = assumePublic;
    };

    // Set the path to receive the registration at the API url
    provider.setRegisterPath = function (registerPath) {

        // set the new register path and add it to the exclude endpoints
        provider.excludeEndpoints.push(registerPath);
        provider.registerPath = registerPath;
    };

    // Set all the provider options at once using JSON
    provider.setOptions = function (options) {
        options = angular.extend({
            apiUrl: '',
            registerPath: '',
            assumePublic: true
        }, options);

        provider.setApiUrl(options.apiUrl);
        provider.setRegisterPath(options.registerPath);
        provider.setAssumePublic(options.assumePublic);
    };

    // Factory 
    provider.$get = function ($http, $q, $rootScope, $state, localStorageService) {

        // Methods

        // Register user
        var _register = function (registerData) {
            var data = {
                UserName: registerData.UserName,
                Email: registerData.Email,
                Password: registerData.Password,
                ConfirmPassword: registerData.ConfirmPassword,
                FirstName: registerData.FirstName,
                LastName: registerData.LastName,
                Gender: registerData.Gender,
                DOB: registerData.DOB,
                Specialty: registerData.Specialty,
                PhoneNumber: registerData.PhoneNumber
            };

            var deferred = $q.defer();

            $http.post(provider.apiUrl + provider.registerPath, JSON.stringify(data), { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
                .success(function (response) {
                    deferred.resolve(response);
                })
            .error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        // Service API
        var service =
        {
            register: _register,
            apiUrl: provider.apiUrl
        };
        return service;
    };

});