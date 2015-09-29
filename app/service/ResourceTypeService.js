define(['angularAMD'], function (angularAMD) {

    angularAMD.service('ResourceTypeService', [ '$http', 'config','$log',
        function( $http, config, $log ) {
            var self = this;

            this.getResourceTypesList = function (callback) {
                $http.get(config.API_URL + '/resource-type' ).then(
                    function(data) {
                        callback(null, data.data.data);
                    }
                );
            };

            this.getResourceType = function (id, callback) {

                $http.get(config.API_URL + '/resource-type/' + id ).then(
                    function(data) {
                        callback(null, data.data.data);
                    }
                );
            };

            this.saveResourceType = function (resourceType, callback) {
                $http.post(config.API_URL + '/resource-type', resourceType).then(
                    function(data) {
                        callback(null, data.data.data);
                    }
                );
            };

            this.updateResourceType = function (resourceType, callback) {
                $http.put(config.API_URL + '/resource-type/' + resourceType.id, resourceType ).then(
                    function(data) {
                        $log.debug('Update response: ', data);
                        callback(data.data.errors, data.data.data);
                    }
                );
            };


        }
    ]);
});