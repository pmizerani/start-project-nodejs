angular.module('ovulo')
    .factory('NotificationService', function ($resource, urls) {

        var factory = {};

        factory.authentication = $resource(urls.BASE_API + '/api/auth',
            null,
            {'login': {method: 'POST'}}
        );

        return factory;

    });