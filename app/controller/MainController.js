define(['appModule', 'UserService'], function (app) {

    app.controller('MainController',
        ['$scope', '$state','UserService','config',
            function ($scope, $state, UserService, config) {

                console.log('MainController');

            }]);
});