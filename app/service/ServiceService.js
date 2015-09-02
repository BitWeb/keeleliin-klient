define(['angularAMD'], function (angularAMD) {

    angularAMD.service('ServiceService', [ '$http', 'config','$log',
        function( $http, config, $log ) {
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
                        callback(null, data.data.data);
                    },
                    function(data) {
                        callback(data);
                    }
                );
            };

            this.saveService = function (service, callback) {
                $http.post(config.API_URL + '/service', service).then(
                    function(data) {
                        callback(null, data.data.data);
                    },
                    function(data) {
                        callback(data);
                    }
                );
            };

            this.updateService = function (service, callback) {
                $http.put(config.API_URL + '/service/' + service.id, service ).then(
                    function(data) {
                        $log.debug('Update response: ', data);
                        callback(data.data.errors, data.data.data);
                    },
                    function(data) {
                        callback(data);
                    }
                );
            };

            this.getServicesSelectList = function (callback) {
                self.getServicesList(function (err, data) {
                    if(err){
                        return callback(err);
                    }
                    callback(null, data.filter(function (item) {
                        return item.isActive == true;
                    }));
                });
            }
        }
    ]);
});