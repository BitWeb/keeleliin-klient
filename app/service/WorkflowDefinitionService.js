define(['angularAMD'], function (angularAMD) {

    angularAMD.service('WorkflowDefinitionService', [ '$http', 'config', '$modal',
        function( $http, config, $modal ) {
            var self = this;

            this.openAddDefinitionModal = function ($scope, project) {
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
            };

            this.defineNewWorkflow = function (definition, callback) {

                $http.post(config.API_URL + '/workflow/define', definition).then(
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

            this.getWorkflowsDefinition = function (workflowId, callback) {

                $http.get(config.API_URL + '/workflow/'+ workflowId +'/definition' ).then(
                    function(data, status) {
                        console.log(data.data);
                        callback(null, data.data);
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

            this.updateDefinitionServices = function( workflow, selectedServices, callback){

                $http.put(config.API_URL + '/workflow/'+ workflow.id +'/definition/services', selectedServices ).then(
                    function(data, status) {
                        console.log(data.data);
                        callback(null, data.data);
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

            this.getServiceFromList = function (id, list) {
                for(i in list){
                    if(list[i].id == id){
                        return list[i];
                    }
                }
            };

            this.getAvailableFollowingServices = function (selectedServices, servicesList) {
                var availableServices = [];

                if(selectedServices.length == 0){
                    availableServices = servicesList.slice();
                    return availableServices;
                }
                for(i in selectedServices){
                    var service = self.getServiceFromList(selectedServices[i].serviceId, servicesList);
                    for(j in service.childServices){
                        var followingService = self.getServiceFromList( service.childServices[j], servicesList );
                        availableServices.push( followingService );
                    }
                }

                return availableServices.filter(function(value, index, self) {
                    return self.indexOf(value) === index;
                });
            };



        }
    ]);
});