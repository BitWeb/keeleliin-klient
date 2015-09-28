/**
 * Created by priit on 17.08.15.
 */

define(['angularAMD','UserService'], function (angularAMD) {

    angularAMD.controller('AuthController', ['$scope', '$state', 'UserService', function ($scope, $state, userService) {
        if(userService.isAuthenticated()){
            $state.go('home');
            return;
        }

        $scope.startAuthentication = function () {
            userService.startAuth();
        };
    }]);
});