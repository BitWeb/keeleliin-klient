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

            this.getServicesGridList = function (callback) {
                $http.get(config.API_URL + '/service/grid' ).then(
                    function(data) {
                        callback(null, self.mapGrid( data.data.data ));
                    }
                );
            };

            self.mapGrid = function (list) {

                for( var i = 0; i < list.length; i++ ){
                    var service = list[i];
                    if( service.parentVersionId != null){
                        for( var j = 0; j < list.length; j++ ){
                            if(service.parentVersionId == list[j].id){
                                var parentService = list[j];
                                if(parentService.childVersions == undefined){
                                    parentService.childVersions = [];
                                }
                                parentService.childVersions.push(service);
                            }
                        }
                    }
                }

                var leavesList = [];
                for( var i = 0; i < list.length; i++ ) {
                    var service = list[i];
                    if(service.childVersions == undefined){
                        service.parentVersions = [];
                        if( service.parentVersionId ){
                            var parentVersion = self.getFromListById(service.parentVersionId, list);
                            while(parentVersion){
                                service.parentVersions.push(parentVersion);
                                if(parentVersion.parentVersionId){
                                    parentVersion = self.getFromListById(parentVersion.parentVersionId, list);
                                } else {
                                    parentVersion = null;
                                }
                            }
                        }
                        leavesList.push(service);
                    }
                }
                return leavesList;
            };

            self.getFromListById = function (id, list) {
                for(var i = 0; i < list.length; i++){
                    if(list[i].id == id){
                        return list[i];
                    }
                }
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
            };

            this.getServiceCopy = function (parentService) {


                var service = parentService;
                service.name = service.name + ' (uus)';
                service.parentVersionId = parentService.id;
                service.id = null;

                for(i in service.serviceInputTypes){
                    service.serviceInputTypes[i].id = null;
                }

                for(i in service.serviceOutputTypes){
                    service.serviceOutputTypes[i].id = null;
                }

                for(i in service.serviceParams){
                    service.serviceParams[i].id = null;
                    for(j in service.serviceParams[i].paramOptions ){
                        service.serviceParams[i].paramOptions[j].id = null;
                    }
                }

                return service;
            };
        }
    ]);
});