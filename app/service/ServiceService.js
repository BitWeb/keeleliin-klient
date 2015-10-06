define(['angularAMD'], function (angularAMD) {

    angularAMD.service('ServiceService', [ '$http', 'config','$log','$modal',
        function( $http, config, $log, $modal ) {
            var self = this;

            this.getServicesList = function (callback) {
                $http.get(config.API_URL + '/service' ).then(
                    function(data) {
                        callback(null, data.data.data);
                    }
                );
            };

            this.toggleServiceStatus = function (service, callback) {

                $http.put(config.API_URL + '/service/' + service.id + '/toggle-status' ).then(
                    function(data) {
                        callback(null, data.data.data);
                    }
                );
            };

            this.getService = function (serviceId, callback) {

                $http.get(config.API_URL + '/service/' + serviceId ).then(
                    function(data) {
                        callback(null, data.data.data);
                    }
                );
            };

            this.saveService = function (service, callback) {
                $http.post(config.API_URL + '/service', service).then(
                    function(data) {
                        callback(null, data.data.data);
                    }
                );
            };

            this.updateService = function (service, callback) {
                $http.put(config.API_URL + '/service/' + service.id, service ).then(
                    function(data) {
                        $log.debug('Update response: ', data);
                        callback(data.data.errors, data.data.data);
                    }
                );
            };

            //Ainult aktiivsed teenused
            this.getServicesSelectList = function (callback) {
                self.getServicesList(function (err, data) {
                    if(err){
                        return callback(err);
                    }
                    callback(null, data.filter(function (item) {
                        return item.isActive == true;
                    }));
                });
            };

            this.getDefineServices = function ( callback ) {
                $http.get(config.API_URL + '/service/detailed').then(
                    function(data) {
                        callback(null, data.data.data);
                    }
                );
            };

            this.openServiceInfoModal = function (serviceId) {
                $modal.open({
                    templateUrl: '../../views/service/info_modal.html',
                    controller: 'ServiceInfoModalController',
                    resolve: {
                        serviceId: function(){
                            return serviceId;
                        }
                    }
                });
            };

            this.deleteService = function (service, callback) {
                $http.delete(config.API_URL + '/service/' + service.id ).then(
                    function(data) {
                        $log.debug('Delete response: ', data);
                        callback(data.data.errors, data.data.data);
                    }
                );
            }

        }
    ]);
});