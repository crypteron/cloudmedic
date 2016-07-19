angular.module('cloudmedic', [  
  'templates-app',
  'templates-common',
  'cloudmedic.profile',  
  'cloudmedic.login',
  'cloudmedic.register',
  'cloudmedic.sso',
  'cloudmedic.config',
  'cloudmedic.messages',
  'cloudmedic.resources',    
  'cloudmedic.admin',
  'cloudmedic.supporter',
  'cloudmedic.patient',
  'cloudmedic.careteams',
  'cloudmedic.medications',
  'cloudmedic.prescriptions',
  'cloudmedic.provider',
  'xeditable',
  'ui.router',
  'ui.mask',
  'auth',
  'form',
  'localizedMessages',
  'localizedNotifications',
  'angular-loading-bar',
  'errorHandler',  
  'userProfile'
])
.config(["$urlRouterProvider", "authProvider", "APP_CONFIG", "localizedMessagesProvider", "CM_MESSAGES", function ($urlRouterProvider, authProvider, APP_CONFIG, localizedMessagesProvider, CM_MESSAGES) {
        // Configure the localized messages provider with the messages 
        localizedMessagesProvider.setMessages(CM_MESSAGES);

        // Configure the authentication provider
        authProvider.setOptions({
            apiUrl: APP_CONFIG.api_url,
            loginState: 'login',
            assumePublic: false,
            tokenPath: 'token',
            // These are regular expressions to match
            excludeEndpoints: [
                'account/forgotUsername$',
                'account/forgotPassword$',
                'account/resetPassword$',
                'account/resendVerify$',
                // The registration request
                'Register$',
                'Supporter$',
                // The entire demo route
                'demo/.*$'
            ]
        });

        // Enable to 'contains' method for all browsers
        if (!('contains' in String.prototype)) {
            String.prototype.contains = function (str, startIndex) {
                return -1 !== String.prototype.indexOf.call(this, str, startIndex);
            };
        }

        // Set default URL
        $urlRouterProvider.otherwise('/login');
    }]
)
.run(['editableOptions', function (editableOptions) {
    editableOptions.theme = 'bs3'; // set xeditable theme to Bootstrap 3
}])
.controller('AppCtrl', ["$scope", "localizedNotifications", "$state", "$rootScope", "auth", "APP_CONFIG", "$window", "userProfile", function ($scope, localizedNotifications, $state, $rootScope, auth, APP_CONFIG, $window, userProfile) {
        $rootScope.base_uri = APP_CONFIG.base_uri;
        $scope.environment = APP_CONFIG.environment;
        //if ($window.hasOwnProperty('Stripe')) {
        //    $window.Stripe.setPublishableKey(APP_CONFIG.stripe_key);
        //}
        auth.init();
        $scope.hideNav = false;
        $rootScope.previous = 'login';
        $rootScope.previousParams = {};

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            // Update page title when state changes
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | CloudMedic Dashboard';
            }

            $scope.bodyClass = toState.data.bodyClass;

            // Allow controllers to hide nav bar via state data
            $scope.hideNav = toState.data.hideNav;

            // Store previous state
            $rootScope.previousState = fromState.name;
            $rootScope.previousParams = fromParams;
        });
    }]
)
.controller('NavbarCtrl', 
    ["$scope", "auth", "$state", "localizedNotifications", "userProfile", function ($scope, auth, $state, localizedNotifications, userProfile) {
        $scope.authStatus = auth.status;

        $scope.isAdmin = function () {
            return auth.status.token && auth.status.token.userRole.contains("SysAdmin");
        };
        $scope.isStaff = function () {
            return auth.status.token && (auth.status.token.userRole.contains("Physician") || auth.status.token.userRole.contains("Nurse"));
        };
        $scope.isMedicationViewer = function () {
            return auth.status.token.userRole.contains("Physician");
        };
        $scope.isPatient = function () {
            return auth.status.token.userRole.contains("Patient");
        };
        $scope.isSupporter = function () {
            return auth.status.token.userRole.contains("Supporter");
        };
        //// When the user logs in, fetch the profile whenever the user logs in
        //$scope.$on('authService:login', function () {
        //    $scope.profile = userProfile.get();
        //});

        //// In case the page is refreshed after the user logs in, manually load the profile
        //if (auth.status.isLoggedIn) {
        //    $scope.profile = userProfile.get();
        //}

        $scope.logout = function () {
            localizedNotifications.removeAll();
            auth.logout();
            $state.go('login');
        };
        $scope.$state = $state;
    }]
)
// Enable custom truncation to use in place of limitTo filter
.filter('cutTo', function () {
    return function (value, wordwise, max, tail) {
        if (!value) {
            return '';
        }

        max = parseInt(max, 10);
        if (!max) {
            return value;
        }
        if (value.length <= max) {
            return value;
        }
        
        value = value.substr(0, max);
        // Prevent truncation in the middle of a word
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || '...');
    };
});

