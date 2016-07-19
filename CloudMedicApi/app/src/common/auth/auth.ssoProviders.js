angular.module('auth.ssoProviders', [])
.constant('AUTH_SSO_PROVIDERS',
    {   
        azure: {
            label: "Microsoft Azure Marketplace Users",
            url: 'https://manage.windowsazure.com/#Workspaces/StoreExtension/Store',
            image: 'assets/azure-logo.png',
            'class': 'btn-azure'
        }
    });