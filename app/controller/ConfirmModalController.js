define(['angularAMD'], function (app) {

    app.controller('ConfirmModalController',
        ['$scope','$log','$modalInstance','message',
            function ($scope, $log, $modalInstance, message ) {

                $scope.message = message;


                console.log('ConfirmModalController');

                $scope.confirm = function () {
                    $modalInstance.close(true);
                }
            }]);
});