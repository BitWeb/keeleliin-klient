define(['appModule', 'UserService', 'ErrorModalController'], function (app) {

    app.controller('MainController',
        ['$scope', '$state','UserService','config','$rootScope','$modal',
            function ($scope, $state, UserService, config, $rootScope, $modal) {

                console.log('MainController');


                $rootScope.addError = function (rejection) {

                    if(rejection.status == 401 && !$rootScope.user){
                        return;
                    }

                    if( rejection.status == 0 ){
                        return;
                    }

                    $modal.open({
                        controller: 'ErrorModalController',
                        templateUrl: '../../views/errorModal.html',
                        resolve: {
                            rejection: function () {
                                return rejection;
                            }
                        }
                    });
                };

            }]);
});