angular.module('apps.mocks', [])
.constant('MOCK_APPS_DATA',[
    {
        AppId: 2029,
        AppName: "Patient Manager",
        AppSecret: "EiAx7e7pxssH4RTw9Q5mkWD8L4ChUbXPPl1lHiG/l3OrThjtDw==",
        PlanId: 0,
        PlanName: "Free"
    },
    {
        AppId: 2039,
        AppName: "HR Portal",
        AppSecret: "EiACvGodNWTq0OfsN3AcYtzg...EjGF7xTX9wgBW8yRxj3Dw==",
        PlanId: 2,
        PlanName: "Standard"
    }
    ]
)
.constant('MOCK_APP_DATA', {
    AppId: 2029,
    AppName: "Patient Manager",
    AppSecret: "EiAx7e7pxssH4RTw9Q5mkWD8L4ChUbXPPl1lHiG/l3OrThjtDw==",
    PlanId: 0,
    PlanName: "Free"
});