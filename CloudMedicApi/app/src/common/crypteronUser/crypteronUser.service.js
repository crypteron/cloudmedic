angular.module('crypteronUser.service', ['profile.resource'])
.factory('CrypteronUser', ['Profile', function (Profile) {
	var _profile = Profile.$get();
	return _profile;
}]);