angular.module('acl.mocks', [])
.constant('MOCK_ACL_DATA', [
   {
       "AceId": 1,
       "RoleId": "doctors",
       "Permissions": 983052,
       "KeyEntityId": 1
   },
   {
       "AceId": 2,
       "RoleId": "patients",
       "Permissions": 983048,
       "KeyEntityId": 1
   }
]
)
.constant('MOCK_ACE_DATA',
   {
       "AceId": 1,
       "RoleId": "doctors",
       "Permissions": 983052,
       "KeyEntityId": 1
   }
);
