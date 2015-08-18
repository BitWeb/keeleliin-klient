define(['appModule'], function (app) {

    app.service('UserService', [ '$http','$state',
        function($http, $state) {

            var user = {
              token: null

            };

            this.isAuthenticated = function () {
                return user.token != null;
            };

            this.changeSate = function(){





            };
        }
    ]);
});