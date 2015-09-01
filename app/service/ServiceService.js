define(['angularAMD'], function (angularAMD) {

    angularAMD.service('ServiceService', [ '$http', 'config',
        function( $http, config ) {
            var self = this;

            this.getServicesList = function (callback) {
                $http.get(config.API_URL + '/service' ).then(
                    function(data) {
                        callback(null, data.data.data);
                    },
                    function(data) {
                        callback(data);
                    }
                );
            };

            this.toggleServiceStatus = function (service, callback) {

                $http.put(config.API_URL + '/service/' + service.id + '/toggle-status' ).then(
                    function(data) {
                        callback(null, data.data.data);
                    },
                    function(data) {
                        callback(data);
                    }
                );
            };

            this.getService = function (serviceId, callback) {

                $http.get(config.API_URL + '/service/' + serviceId ).then(
                    function(data) {
                        callback(null, data.data);
                    },
                    function(data) {
                        callback(data);
                    }
                );
            };
        }
    ]);
});