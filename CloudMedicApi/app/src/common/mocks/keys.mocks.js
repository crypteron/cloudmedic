angular.module('keys.mocks', [])
.constant('MOCK_KEYS_DATA', [
   {
       "KeyId": 1,
       "AppId": 2029,
       "SecPartId": "initech.patientdata",
       "SecPartVer": 1,
       "Description": "Patient medical data",
       "AddedBy": "Peter Gibbons <peter.gibbons@crypteron.com>",
       "CreatedAt": "2014-08-13T00:00:00",
       "ModifiedAt": "2014-09-17T20:22:44.7217643",
       "Oid": "2.16.840.1.101.3.4.1.46",
       "AccessControlEntries": [
          {
              "AceId": 1,
              "RoleId": "doctors",
              "Permissions": 12,
              "KeyEntityId": 1
          },
          {
              "AceId": 2,
              "RoleId": "patients",
              "Permissions": 8,
              "KeyEntityId": 1
          }
       ]
   },
   {
       "KeyId": 4,
       "AppId": 2029,
       "SecPartId": "initech.billing",
       "SecPartVer": 1,
       "Description": "Patient billing details",
       "AddedBy": "Peter Gibbons <peter.gibbons@crypteron.com>",
       "CreatedAt": "2014-10-20T23:12:20.788121",
       "ModifiedAt": "2014-10-20T23:12:20.788121",
       "Oid": "2.16.840.1.101.3.4.1.6",
       "AccessControlEntries": [
          {
              "AceId": 6,
              "RoleId": "finance",
              "Permissions": 4,
              "KeyEntityId": 4
          },
          {
              "AceId": 11,
              "RoleId": "patients",
              "Permissions": 12,
              "KeyEntityId": 4
          }
       ]
   }
]
)
.constant('MOCK_KEY_DATA', {
    "KeyId": 1,
    "AppId": 2029,
    "SecPartId": "initech.patientdata",
    "SecPartVer": 1,
    "Description": "Patient medical data",
    "AddedBy": "Peter Gibbons <peter.gibbons@crypteron.com>",
    "CreatedAt": "2014-08-13T00:00:00",
    "ModifiedAt": "2014-09-17T20:22:44.7217643",
    "Oid": "2.16.840.1.101.3.4.1.46",
    "AccessControlEntries": [
       {
           "AceId": 1,
           "RoleId": "doctors",
           "Permissions": 12,
           "KeyEntityId": 1
       },
       {
           "AceId": 2,
           "RoleId": "patients",
           "Permissions": 8,
           "KeyEntityId": 1
       }
    ]
})
.constant('MOCK_KEY_NEW_DATA', {
    "KeyId": 99,
    "AppId": 2029,
    "SecPartId": "sample.secpart.id",
    "SecPartVer": 1,
    "Description": "Sample Description",
    "AddedBy": "Peter Gibbons <peter.gibbons@crypteron.com>",
    "CreatedAt": "2014-08-13T00:00:00",
    "ModifiedAt": "2014-09-17T20:22:44.7217643",
    "Oid": "2.16.840.1.101.3.4.1.46"
});