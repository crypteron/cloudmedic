angular.module('cloudmedic.acl.list', ['ui.router', 'cloudmedic.resources', 'cloudmedic.aclPermissions', 'cryFilters', 'ui.bootstrap'])
.controller('ViewAclCtrl', ['$scope', 'key', 'acl', 'aclPermissions', 'Acl', 'localizedNotifications', '$modal', function ($scope, key, acl, aclPermissions, Acl, localizedNotifications, $modal) {
    $scope.acl = aclPermissions.expandPermissions(acl);    
    $scope.permissions = aclPermissions.permissions;
    
    $scope.copyPermissions = function (ace) {
        ace.oldPermissions = ace.Permissions;
    };

    $scope.revertPermissions = function (ace) {
        ace.Permissions = ace.oldPermissions;        
        delete ace.oldPermissions;
    };

    $scope.copyRole = function (ace) {
        ace.oldRoleId = ace.RoleId;        
    };

    
    // Update an existing or create a new ACE
    $scope.saveAce = function (ace, aceForm) {        
        // clear notifications
        localizedNotifications.removeForCurrent();
        
        // New ACE?
        if (ace.AceId === 0) {
            // the server expects an array of ACE's so we can't call the instance method
            // instead we call the class method and explicitly wrap the ACE in an array
            var newAce = Acl.create({ keyId: key.KeyId }, [ace], function () {
                localizedNotifications.addForCurrent('create.success', 'success', { entityType: 'Access Control Entry' });
                // on success we parse out the new ACE from the array result
                ace.AceId = newAce[0].AceId;
            }, function () {
                // on error, reshow the edit form
                aceForm.$show();
            });
        } else {
            ace.$update(null, function () {
                // success callback
                localizedNotifications.addForCurrent('update.success', 'success', { entityType: 'Access Control Entry' });
                ace = aclPermissions.expandPermissions(ace);
            }, function () {
                // error callback.  manual revert ACE
                ace.RoleId = ace.oldRoleId;
                ace.Permissions = ace.oldPermissions;
            });
        }
        
    };

    // Create new ACE and add it to the list.  Does not save it yet
    $scope.addAce = function () {
        var newAce = new Acl({
            AceId: 0,
            KeyEntityId: key.KeyId,
            RoleId: '',
            Permissions: 0
        });

        newAce = aclPermissions.expandPermissions(newAce);

        $scope.acl.push(newAce);
    };

    $scope.checkRole = function (data) {        
        if (!angular.isDefined(data)) {
            return "Role is required";
        }
    };

    $scope.cancelEdit = function (ace, aceForm, index) {
        if (ace.AceId === 0) {
            $scope.acl.splice(index, 1);
        }
        aceForm.$cancel();
    };
    
    $scope.removeAce = function (ace, index) {
        
        localizedNotifications.removeForCurrent();
        $modal.open({
            templateUrl: "app.confirm.tpl.html",
            controller: ['$scope', function ($scope) {                
                $scope.confirmText = "You will not be able to recover this entry!";
                $scope.confirmButton = "Yes, delete entry!";
            }]
        })
      .result.then(function () {
          Acl.remove({ keyId: key.KeyId, aceId: ace.AceId }, function () {
              localizedNotifications.addForCurrent('delete.success', 'success', { entityType: 'Access Control Entry' });
              $scope.acl.splice(index, 1);
          });
      });

    };
}]);