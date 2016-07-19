angular.module('cloudmedic.resources', [
        'prescriptions.resource',
        'careteams.resource',
        'medications.resource',
        'profile.resource',
        'password.resource',
        'registration.resource',
        'cloudmedic.config',
        'users.resource'
    ])
    .config(
        ["MedicationsProvider", "PrescriptionsProvider", "ProfileProvider", "PasswordProvider", "CareTeamsProvider", "RegistrationProvider", "APP_CONFIG", "UsersProvider", function(
            MedicationsProvider,
            PrescriptionsProvider,
            ProfileProvider,
            PasswordProvider,
            CareTeamsProvider,
            RegistrationProvider,
            APP_CONFIG,            
            UsersProvider) {
                MedicationsProvider.setApiUrl(APP_CONFIG.api_url);
                ProfileProvider.setApiUrl(APP_CONFIG.api_url);
                PasswordProvider.setApiUrl(APP_CONFIG.api_url);                
                UsersProvider.setApiUrl(APP_CONFIG.api_url);
                PrescriptionsProvider.setApiUrl(APP_CONFIG.api_url);
                CareTeamsProvider.setApiUrl(APP_CONFIG.api_url);
                RegistrationProvider.setApiUrl(APP_CONFIG.api_url);
        }]
    );