/**
 * Created by priit on 17.08.15.
 */

define(['angularAMD','UserService'], function (angularAMD) {

    angularAMD.controller('AuthController', ['$scope', 'UserService', function ($scope, userService) {
        $scope.startAuthentication = function () {
            userService.startAuth();
        };
    }]);
});