angular.module('auth.messages', [])
.constant('AUTH_MESSAGES',
    {   
        'login.success': 'You have successfully logged in as {{userName}}.',
        'login.required': 'You must be logged in to access the {{pageTitle}} area.',
        'login.required.api': 'You must be logged in to access the CloudMedic API',
        'login.expired': 'Your login has expired.  Please login again to continue.',
        'login.expired.sso': 'Your login has expired.  Please click the link below to login again via {{ssoProvider}}',
        'logout.success': 'You have successfully logged out.',
        'login.sso.success': 'You have been automatically logged in from {{ssoProvider}}',
        'login.failed': 'Invalid username or password entered, please try again.'
    });