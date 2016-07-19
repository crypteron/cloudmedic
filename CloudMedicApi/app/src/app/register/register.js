angular.module('cloudmedic.register', [
    'ui.router',
    'ui.mask',
    'form'
]).config(["$stateProvider", function ($stateProvider) {
    $stateProvider.state('register', {
        url: '/register',
        views: {
            "main": {
                controller: 'FormCtrl',
                templateUrl: 'register/register.tpl.html'
            }
        },
        data: {
            pageTitle: 'Register',
            hideNav: true,
            bodyClass: 'register',
            public: true
        }
    });
}]);