define(['angularAMD', 'ResourceTreeMapper', 'ResourceInfoController', 'ResourceDeleteController'], function (angularAMD, resourceTreeMapper) {

    angularAMD.service('ResourceService', [ '$log', '$http', 'config', '$modal','UserService',
        function( $log, $http, config, $modal, userService ) {
            var self = this;

            this.getResourcesList = function (params, callback) {

                $http.get(config.API_URL + '/resource', {params: params}).then(
                    function(data) {
                        $log.log(data);
                        callback(null, data.data.data);
                    },
                    function(data) {
                        callback(data);
                    }
                );
            };

            this.getJsTreeMapByWorkflow = function (list, context, keyword, resourceParams) {
                return resourceTreeMapper.map(list, context, keyword, resourceParams);
            };

            this.downloadResourceById = function (id) {
                window.location.href = config.API_URL + '/resource/download/' +id + '?token=' + userService.getToken();
            };

            this.getResourceInfo = function (resourceId, callback) {
                $http.get(config.API_URL + '/resource/' + resourceId).then(
                    function(data) {
                        $log.log(data);
                        callback(null, data.data.data);
                    },
                    function(data) {
                        callback(data);
                    }
                );
            };

            this.updateResourceInfo = function (resource, callback) {
                $http.put(config.API_URL + '/resource/' + resource.id, resource).then(
                    function(data) {
                        $log.log(data);
                        callback(null, data.data.data);
                    },
                    function(data) {
                        callback(data);
                    }
                );
            };


            this.deleteResource = function(resource, deleteData, callback) {

                $http.delete(config.API_URL + '/resource/' + resource.id, deleteData ).then(
                    function(data) {
                        $log.log(data);
                        callback(null, data.data.data);
                    },
                    function(data) {
                        callback(data);
                    }
                );
            };

            this.openInfoModal = function( id ){
                return $modal.open({
                    templateUrl: '../../views/resource/info_modal.html',
                    controller: 'ResourceInfoController',
                    resolve: {
                        resourceId: function(){
                            return id
                        }
                    }
                });
            };

            this.openDeleteModal = function( id ){
                return $modal.open({
                    templateUrl: '../../views/resource/delete_modal.html',
                    controller: 'ResourceDeleteController',
                    resolve: {
                        resourceId: function(){
                            return id
                        }
                    }
                });
            };

            this.openResourceMultiselectModal = function(callback){
                return $modal.open({
                    templateUrl: '../../views/resource/multiselect_modal.html',
                    controller: 'ResourceMultiselectController',
                    resolve: {}
                });
            };
        }
    ]);
});