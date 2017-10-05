angular.module('ovulo').controller('ProfileController', function($scope, $rootScope, toastr, $auth, listProfile, UserService) {

    $scope.user = {};
    $scope.listProfiles = listProfile;

    //Get current logged user by ID
    UserService.findById.query( { id : $auth.getPayload().sub.id } ).$promise.then(function (result) {

        $scope.user = {
            id: result.id,
            name: result.name,
            email: result.email,
            password: result.password,
            profile: result.profile,
            newsletter_terms: result.newsletter_terms,
            user_information: {
                id_user: result.id_user
            }
        };

    }).catch(function (err) {
        toastr.error("Erro ao obter dados do usuário.", "Erro");
    });

    /**
     * save
     */
    $scope.save = function () {

        //Save User
        UserService.user.save($scope.user).$promise.then(function (result) {
            toastr.success("Salvo com sucesso!", "OK");
        }).catch(function (err) {
            toastr.error("Erro ao salvar. Verifique os dados e tente novamente.", "Erro");
        });

    };

});