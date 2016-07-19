angular.module('cloudmedic.aclPermissions', [])
.constant('ACL_PERMISSIONS',
     [
        /*{
            name: 'AllowRead',
            label: "Allow Read",
            value: 1 << 0,
            visible: false
        },
        {
            name: 'AllowWrite',
            label: "Allow Write",
            value: 1 << 1,
            visible: false
        },*/
        {
            name: 'AllowDecrypt',
            label: "Allow Decrypt",
            value: 1 << 2,
            visible: true
        },
        {
            name: 'AllowEncrypt',
            label: "Allow Encrypt",
            value: 1 << 3,
            visible: true
        },
        /*,
        {
            name: 'AuditOnKeyRead',
            label: "Audit on Key Read",
            value: 1 << (16 + 0)
        },
        {
            name: 'AuditOnKeyWrite',
            label: "Audit on Key Write",
            value: 1 << (16 + 1)
        },
        {
            name: 'AuditOnDecrypt',
            label: "Audit on Decrypt",
            value: 1 << (16 + 2)
        },
        {
            name: 'AuditOnEncrypt',
            label: "Audit on Encrypt",
            value: 1 << (16 + 3)
        }*/
        {
            name: 'AuditEverything',
            label: "Audit Everything",
            value: (1 << 16) + (1 << 17) + (1 << 18) + (1 << 19),
            visible: false
        }
     ])
.factory('aclPermissions', ['ACL_PERMISSIONS', function (ACL_PERMISSIONS) {
    // Getter / Setter for permission.
    var _getSetPermission = function (ace, permission, grant) {
        // If grant is set, it's a setter
        if (angular.isDefined(grant)) {
            if (grant) {
                ace.Permissions |= permission.value;  // grant permission
            } else {
                ace.Permissions &= ~permission.value;  // remove permission if has it
            }
        }

        // Determine if ACE has permission and convert to boolean
        return ace.Permissions & permission.value ? true : false;
    };

    var _expandAcePermissions = function (ace) {
        ace.permissionList = [];
        angular.forEach(ACL_PERMISSIONS, function (permission) {
            ace.permissionList.push({
                name: permission.name,
                label: permission.label,
                visible: permission.visible,
                value: function (grant) {
                    return _getSetPermission(ace, permission, grant);
                }
            });
        });
        return ace;
    };

    // Decorate an ACE or each ACE within an ACL with a permission list and getter / setter for each permission
    var _expandPermissions = function (acl) {
        // Is this an ACL or ACE?
        if (angular.isArray(acl)) {
            angular.forEach(acl, function (ace) {
                ace = _expandAcePermissions(ace);
            });
        }
        else {
            acl = _expandAcePermissions(acl);
        }
        
        return acl;
    };

    var _service = {
        permissions: ACL_PERMISSIONS,
        expandPermissions: _expandPermissions
    };

    return _service;
}]);