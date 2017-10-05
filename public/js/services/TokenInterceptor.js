angular.module('ovulo')
    .factory('TokenInterceptor', function($q, $window, $location) {

        var interceptor = {};

        interceptor.request = function(config) {
            // enviar o token na requisição

            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                console.log('Enviando token já obtido em cada requisição');
                config.headers['Authorization'] = $window.sessionStorage.token;
            }
            return config;
        },

        interceptor.response = function (response) {

            var token = response.headers('Authorization');
            if (token != null) {
                $window.sessionStorage.token = token;
                console.log('Token no session storage: ', token);
            } 
            return response;
        },

        interceptor.responseError = function(rejection) {
            if (rejection != null && rejection.status === 401) {
                console.log('Removendo token da sessão')
                delete $window.sessionStorage.token;
                $location.path("/login");
            } 
            return $q.reject(rejection);
        }

    return interceptor;

});