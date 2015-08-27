define(['angularAMD'], function (angularAMD) {

    angularAMD.service('ResourceService', [ '$http', 'config', '$modal',
        function( $http, config, $modal ) {
            var self = this;

            this.getResourcesList = function (params, callback) {

                $http.get(config.API_URL + '/resource', {params: params}).then(
                    function(data) {
                        console.log(data);
                        callback(null, data.data.data);
                    },
                    function(data) {
                        callback(data);
                    }
                );
            };

            this.getJsTreeMapByWorkflow = function (list) {
                var map = {};

                for(i in list){
                    var item = list[i];
                    var topId = item.workflowId + 10000000;// + '_' + item.id

                    var workflow = map[topId];
                    if(!workflow){
                        workflow = {
                            id: item.workflowId,
                            text: item.workflowName ? item.workflowName : ('Töövoog ' + item.workflowId),
                            children: []
                        };
                    }
                    var child = {
                        id      : item.id,
                        text    : item.name,
                        type    : "text"
                    };
                    workflow.children.push( child );
                    map[topId] = workflow
                }

                var workflows = [];
                for(i in map){
                    workflows.push(map[i]);
                }

                var root = {
                    id: 0,
                    text: 'Ressursid',
                    children: workflows
                };

                return [root];
            };





/*            this.openAddDefinitionModal = function ($scope, project) {
                return $modal.open({
                    templateUrl: '../../views/workflow/add_definition_modal.html',
                    scope: $scope,
                    controller: 'AddDefinitionModalController',
                    resolve: {
                        project: function(){
                            return project;
                        }
                    }
                });
            };*/

            /*this.addDefinition = function (definition, project, callback) {

                $http.post(config.API_URL + '/workflow-definition/projectId/' + project.id, definition).then(
                    function(data, status) {
                        console.log(data.data);
                        callback(null, data.data.data);
                    },
                    function(data, status) {
                        if(!data){
                            return callback(status);
                        }
                        console.log(data);
                        callback(data);
                    }
                );
            };
*/



        }
    ]);
});