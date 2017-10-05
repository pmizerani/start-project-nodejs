angular.module('ovulo')
    .factory('LoginService', function ($auth, $state, toastr) {

        var factory = {};

        /**
         * authentication
         * @param email
         * @param password
         */
        factory.authentication = function(email, password) {

            //Execute login
            $auth.login({email, password}).then(function (response) {

                $auth.setToken(response);
                $state.go('dashboard.main');
                toastr.success("Login efetuado com sucesso!", "OK");

            }).catch(function (response) {
                toastr.error("E-mail e/ou Senha incorretos.", "Erro");
            });
        };

        /**
         * logout
         */
        factory.logout = function () {
            $auth.logout();
            $state.go('login');
        };

        return factory;

    });