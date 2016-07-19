angular.module('templates-common', ['notifications/notifications.bar.tpl.html']);

angular.module("notifications/notifications.bar.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("notifications/notifications.bar.tpl.html",
    "<div ng-class=\"['alert', 'cm-alert', 'alert-'+notification.type]\" ng-repeat=\"notification in notifications.get()\">\n" +
    "    <button class=\"close\" type=\"button\" ng-click=\"removeNotification(notification)\" ng-if=\"!notification.disableClose\">x</button>\n" +
    "    <span ng-bind-html=\"notification.message\"></span>\n" +
    "</div>\n" +
    "");
}]);
