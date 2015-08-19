define(['angularAMD'], function (angularAMD) {

    angularAMD.service('ProjectService', [ '$http', 'config',
        function( $http, config ) {
            var self = this;

            this.getList = function (params, callback) {

                $http.get(config.API_URL + '/project').
                    then(function(response) {
                        callback(null, response.data.data);
                    }, function(response) {
                        callback(response);
                    });
            };
        }
    ]);
});