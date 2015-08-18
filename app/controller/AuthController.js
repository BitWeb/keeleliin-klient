/**
 * Created by priit on 17.08.15.
 */

define(['angularAMD'], function (angularAMD) {

    angularAMD.controller('AuthController', ['$scope', function ($scope) {

        console.log('AuthController');
        $scope.value = '4';

    }]);
});