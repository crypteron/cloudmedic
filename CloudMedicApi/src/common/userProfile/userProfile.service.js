angular.module('userProfile.service', [
    'profile.resource'  
])
.factory('userProfile',['Profile', '$rootScope', function(Profile, $rootScope){
    var _profile = {};
    var _profileLoaded = false;
    var _get = function () {
        if (!_profileLoaded) {
            _profileLoaded = true;
            _profile = Profile.get();
        }
        return _profile;
    };

    // clear singleton on logout
    $rootScope.$on('authService:logout', function () {
        _profile = {};
        _profileLoaded = false;        
    });

    var service = {
        get: _get
    };

    return service;
}]);