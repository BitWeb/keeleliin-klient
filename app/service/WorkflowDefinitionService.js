define(['angularAMD'], function (angularAMD) {

    angularAMD.service('WorkflowDefinitionService', ['$http', 'config', '$modal', '$log',
        function ($http, config, $modal, $log) {
            var self = this;

            this.openAddDefinitionModal = function ($scope, project) {
                return $modal.open({
                    templateUrl: '../../views/workflow/definition_settings_modal.html',
                    scope: $scope,
                    controller: 'AddDefinitionModalController',
                    resolve: {
                        project: function () {
                            return project;
                        }
                    }
                });
            };

            this.openAddWorkflowModal = function ($scope, project) {
                return $modal.open({
                    templateUrl: '../../views/workflow/add_modal.html',
                    scope: $scope,
                    controller: 'WorkflowAddModalController',
                    resolve: {
                        project: function () {
                            return project;
                        }
                    }
                });
            };

            this.createWorkflowFromDefinition = function (definitionId, projectId, callback) {

                var data = {
                    workflowDefinitionId: definitionId,
                    projectId: projectId
                };

                $http.post(config.API_URL + '/workflow/create', data).then(
                    function (data, status) {
                        console.log(data.data);
                        callback(null, data.data.data);
                    }
                );
            };

            this.defineNewWorkflow = function (definition, callback) {

                $http.post(config.API_URL + '/workflow/define', definition).then(
                    function (data, status) {
                        console.log(data.data);
                        callback(null, data.data.data);
                    },
                    function (data, status) {
                        if (!data) {
                            return callback(status);
                        }
                        console.log(data);
                        callback(data);
                    }
                );
            };

            this.getWorkflowsDefinition = function (workflowId, callback) {

                $http.get(config.API_URL + '/workflow/' + workflowId + '/definition').then(
                    function (data, status) {
                        console.log(data.data);
                        callback(null, data.data.data);
                    }
                );
            };

            this.getDefinitionOverview = function (definitionId, callback) {

                $http.get( config.API_URL + '/workflow-definition/' + definitionId ).then(
                    function (data, status) {
                        console.log(data.data);
                        callback(null, data.data.data);
                    }
                );
            };

            this.getWorkflowsDefinitionsList = function (params, callback) {
                $http.get(config.API_URL + '/workflow-definition', { params: params }).then(
                    function (data, status) {
                        callback(null, data.data.data);
                    }
                );
            };


            this.updateDefinitionServices = function (workflow, selectedServices, callback) {
                $http.put(config.API_URL + '/workflow/' + workflow.id + '/definition/services', selectedServices).then(
                    function (data, status) {
                        console.log(data.data);
                        callback(null, data.data.data);
                    }
                );
            };


            this.openDefinitionSettingsModal = function ($scope, definition, cb) {
                var modalInstance = $modal.open({
                    templateUrl: '../../views/workflow/definition_settings_modal.html',
                    controller: 'WorkflowDefinitionSettingsModalController',
                    resolve: {
                        definitionId: function(){
                            return definition.id;
                        }
                    }
                });
                modalInstance.result.then(function (data) {

                    definition.name = data.name;
                    definition.description = data.description;
                    definition.purpose = data.purpose;
                    definition.accessStatus = data.accessStatus;
                    definition.publicUrl = data.publicUrl;

                    $scope.$broadcast('updateBreadcrumb');
                    cb(null, definition);
                });
            };

            this.getDefinitionSettings = function (definitionId, cb) {

                self.getDefinitionOverview(definitionId, function (err, overview) {
                    if(err){
                       return cb(err);
                    }

                    var settings = {
                        id: overview.id,
                        name: overview.name,
                        description: overview.description,
                        purpose: overview.purpose,
                        accessStatus: overview.accessStatus,
                        users: []
                    };

                    for(var i = 0, l = overview.sharedUsers.length; i < l; i++){
                        if(overview.sharedUsers[i].role != 'owner'){
                            settings.users.push(overview.sharedUsers[i].user.id);
                        }
                    }
                    return cb(null, settings);
                });
            };

            this.updateDefinitionSettings = function (definition, callback) {

                $http.put(config.API_URL + '/workflow-definition/' + definition.id , definition).then(
                    function (data, status) {
                        $log.debug(data.data);
                        callback(null, data.data.data);
                    }
                );
            };

            this.getWorkflowDefinitionsManagementList = function (params, callback) {
                $http.get(config.API_URL + '/workflow-definition/management-list', { params: params } ).then(
                    function (data, status) {
                        callback(null, data.data.data);
                    }
                );
            };

            this.toggleDefinitionBookmark = function (definitionId, cb) {
                $http.put(config.API_URL + '/workflow-definition/' + definitionId + '/toggle-bookmark' ).then(
                    function (data, status) {
                        $log.debug(data.data);
                        cb(null, data.data.data);
                    }
                );
            };

            this.deleteWorkflowDefinition = function (definitionId, callback) {
                var modalInstance = $modal.open({
                    templateUrl: '../../views/confirm_modal.html',
                    controller: 'ConfirmModalController',
                    resolve: {
                        message: function () {
                            return 'Kas oled kindel, et soovid antud töövookirjelduse kustutada?';
                        }
                    }
                });
                modalInstance.result.then(function (confirm) {
                    if(confirm == true){
                        $http.delete(config.API_URL + '/workflow-definition/' + definitionId).then(
                            function(data) {
                                callback(null, true);
                            }
                        );
                    } else {
                        callback(null, false);
                    }
                });
            };

        }
    ]);
});