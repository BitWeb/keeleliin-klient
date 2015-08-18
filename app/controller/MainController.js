define(['appModule', 'UserService'], function (app) {

    app.controller('MainController',
        ['$scope', '$state','UserService',
            function ($scope, $state, UserService) {

                $scope.signOut = function () {
                    console.log('signOut');
                    console.log($state);
                    $state.go('auth');
                    $state.reload();
                    console.log($state);
                };





/*                console.log(UserService);
                UserService.changeSate();*/


                //$scope.value = '1';

                if(!$scope.value){
                    $scope.value = 0
                }


                $scope.value++;


                console.log('MainController');


            }]);
});