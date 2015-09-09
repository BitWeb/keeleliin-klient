define(['angularAMD', 'ResourceInfoController', 'ResourceDeleteController'], function (angularAMD) {

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

            this.getJsTreeMapByWorkflow = function (list, type, keyword) {
                var map = {};
                var treeMap = {};

                for(i in list){
                    var item = list[i];

                    if(type && item.contextType != type){
                        continue;
                    }

                    if(keyword){
                        var name = item.name;
                        if(name.indexOf(keyword) == -1){
                            continue;
                        }
                    }

                    var fileId = i;
                    var workflowId = item.workflowId + 10000000;

                    if(!item.workflowId){
                        treeMap[fileId] = item.id;
                        map[fileId] = {
                            id      : fileId,
                            text    : item.name,
                            type    : "text"
                        };
                        continue;
                    }

                    var workflow = map[workflowId];
                    if(!workflow){
                        workflow = {
                            id: workflowId,
                            text: item.workflowName ? item.workflowName : ('Töövoog ' + item.workflowId),
                            children: [],
                            state: {
                                opened:true
                            }
                        };
                        map[workflowId] = workflow
                    }

                    treeMap[fileId] = item.id;
                    var child = {
                        id      : fileId,
                        text    : item.name,
                        type    : "text"
                    };
                    workflow.children.push( child );
                }

                var workflows = [];
                for(i in map){
                    workflows.push(map[i]);
                }

                return {
                    resources: workflows,
                    resourcesMap: treeMap
                };
            };

            this.downloadResourceById = function (id) {
                var anchor = angular.element('<a/>');
                anchor.attr({
                    href: config.API_URL + '/resource/download/' +id + '?token=' + userService.getToken(),
                    target: '_blank'
                })[0].click();
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

            this.getResourceTypes = function (callback) {

                $http.get(config.API_URL + '/resource/types').then(
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
            }

        }
    ]);
});