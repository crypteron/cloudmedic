angular.module('cmFilters', [])
    .filter('checkmark', ['$sce', function ($sce) {
        return function (input, withX) {
            var x = withX ? $sce.trustAsHtml('<i class="fa fa-close"></i>') : '';
            return input ? $sce.trustAsHtml('<i class="fa fa-check"></i>') : x;
    };
}]);