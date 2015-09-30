define(['appModule'], function (app) {

    app.controller('ErrorModalController',
        ['$scope', '$state','UserService','config','$rootScope','rejection',
            function ($scope, $state, userService, config, $rootScope, rejection) {
                console.log('ErrorModalController');

                $scope.rejection = rejection;

                $scope.closeErrorModal = function () {
                    if($scope.rejection.data && $scope.rejection.data.statusCode == 401){
                        userService.signOut();
                    }
                    $scope.$dismiss();
                };

                $scope.getMessages = function () {
                    var messages = [];
                    if($scope.rejection.data && $scope.rejection.data.errors){
                        var errors = $scope.rejection.data.errors;

                        if(typeof errors === 'string'){
                            messages.push( errors );
                        } else if (Object.prototype.toString.call( errors ) === '[object Array]'){
                            messages = errors;
                        } else {
                            messages = errors;
                        }
                    } else {
                        messages.push( $scope.rejection );
                    }
                    return messages;
                }
            }]);
});