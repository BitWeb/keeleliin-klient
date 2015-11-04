define(['angularAMD', 'ResourceTreeMapper', 'ResourceInfoController', 'ResourceDeleteController'], function (angularAMD, resourceTreeMapper) {

    angularAMD.service('ResourceService', [ '$log', '$http', 'config', '$modal','UserService',
        function( $log, $http, config, $modal, userService ) {
            var self = this;

            this.getResourcesList = function (params, callback) {

                $http.get(config.API_URL + '/resource', {params: params}).then(
                    function(data) {
                        $log.log(data);
                        callback(null, data.data.data);
                    }
                );
            };

            this.getJsTreeMapByWorkflow = function (list, context, keyword, resourceParams) {
                return resourceTreeMapper.map(list, context, keyword, resourceParams);
            };

            this.downloadResourceById = function (id) {
                window.location.href = config.API_URL + '/resource/' +id + '/download?token=' + userService.getToken();
            };

            this.getResourceInfo = function (resourceId, callback) {
                $http.get(config.API_URL + '/resource/' + resourceId).then(
                    function(data) {
                        $log.log(data);
                        callback(null, data.data.data);
                    }
                );
            };

            this.updateResourceInfo = function (resource, callback) {
                $http.put(config.API_URL + '/resource/' + resource.id, resource).then(
                    function(data) {
                        $log.log(data);
                        callback(null, data.data.data);
                    }
                );
            };

            this.loadFromUrl = function (urlData, callback) {
                $http.post(config.API_URL + '/resource/upload-url', urlData).then(
                    function(data) {
                        $log.log(data);
                        callback(null, data.data.data);
                    }
                );
            };

            this.deleteResourceAssociation = function(associationId, callback) {
                $http.delete(config.API_URL + '/resource/association/' + associationId ).then(
                    function(data) {
                        $log.log(data);
                        callback(null, data.data.data);
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

            this.openDeleteModal = function( resourceData ){
                return $modal.open({
                    templateUrl: '../../views/resource/delete_modal.html',
                    controller: 'ResourceDeleteController',
                    resolve: {
                        resourceData: function(){
                            return resourceData
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