angular.module('ovulo').controller('LoginController', function ($scope, $rootScope, $http, $window, $auth, $location, LoginService) {

    $scope.user = {};
    $scope.message = '';

    /**
     * login
     */
    $scope.login = function () {
        LoginService.authentication($scope.user.email, $scope.user.password);
    };

});