angular.module('ovulo')
    .factory('UserService', function ($resource, urls) {

        var factory = {};

        /**
         * findById.query
         */
        factory.findById = $resource(urls.BASE_API + '/api/user/:id',
            null,
            {'query': {method: 'GET'}}
        );

        /**
         * user.save
         */
        factory.user = $resource(urls.BASE_API + '/api/user',
            null,
            {'save': {method: 'PUT'}}
        );

        return factory;

    });