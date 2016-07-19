angular.module('errorHandler', ['errorHandler.service', 'errorHandler.messages'])
.run(['ERROR_MESSAGES', 'localizedMessages', function (ERROR_MESSAGES, localizedMessages) {
    // Add authentication messages to localized message collection but allow app to over write
    localizedMessages.addIfNotExists(ERROR_MESSAGES);
}
]);
