angular.module('ovulo').controller('GeneralController', function($scope, $auth, $state, $http, $window, $location, LoginService) {

    // console.log($auth.getPayload().sub)
    console.log("GeneralController...")

    $scope.loogedUser = {};
    if ($auth.isAuthenticated()) $scope.loogedUser = $auth.getPayload().sub;
    else $location.path("/login")

    /**
     * logout
     */
    $scope.logout = function () {
        LoginService.logout();
    };

    /**
     * getClass
     * Método para alterar highlight do menu
     * @param path
     * @returns {string}
     */
    $scope.getClass = function (path) {
        return ($location.path().substr(0, path.length) === path) ? 'active' : '';
    }

});