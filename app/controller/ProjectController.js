define(['angularAMD'], function (angularAMD) {

angularAMD.controller('ProjectController', ['$scope','$state', '$stateParams',
    function($scope, $state, $routeParams) {


        $scope.value = '2';
        console.log('ProjectController');


    }]);
});