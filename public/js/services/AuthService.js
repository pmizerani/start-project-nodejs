/**
 * AuthService
 */
angular.module('ovulo').service('AuthService', function ($resource, $http, $auth) {

        var factory = {};

        /**
         * Check if token is valid after resource request
         * @returns {boolean}
         */
        function checkToken() {
            if ($auth.getToken()) {
                return true;
            } else {
                return false;
            }
        };

        /**
         * Require auth in routes
         * @param $q
         * @param $location
         * @returns {*}
         */
        factory.loginRequired = function ($q, $state, $auth) {
            console.log("Login>>> ", checkToken());
            var deferred = $q.defer();
            if (checkToken()) {
                deferred.resolve();
            } else {
                $state.go('dashboard');
            }
            return deferred.promise;
        };

        return factory;

});
