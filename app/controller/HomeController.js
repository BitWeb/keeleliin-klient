/**
 * Created by priit on 17.08.15.
 */

define(['angularAMD'], function (angularAMD) {

    angularAMD.controller('HomeController', ['$scope', function ($scope) {

        console.log('HomeController');
        $scope.value = '3';

    }]);
});