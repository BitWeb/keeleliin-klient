define(['angularAMD'], function (angularAMD) {

    angularAMD.service('WorkflowService', [ '$http', 'config', '$modal',
        function( $http, config, $modal ) {
            var self = this;

            this.getWorkflow = function (workflowId, callback) {
                $http.get(config.API_URL + '/workflow/' + workflowId).then(
                    function(data) {
                        callback(null, data.data.data);
                    }
                );
            };

            this.runWorkflow = function (workflowId, callback) {
                $http.put(config.API_URL + '/workflow/' + workflowId + '/run').then(
                    function(data) {
                        callback(null, data.data.data);
                    }
                );
            };

            this.cancelWorkflow = function (workflowId, callback) {

                $http.put(config.API_URL + '/workflow/' + workflowId + '/cancel').then(
                    function(data) {
                        callback(null, data.data.data);
                    }
                );
            };

            this.openWorkflowSettingsModal = function ($scope, workflow) {
                var modalInstance = $modal.open({
                    templateUrl: '../../views/workflow/settings_modal.html',
                    controller: 'WorkflowSettingsModalController',
                    resolve: {
                        workflowId: function(){
                            return workflow.id;
                        }
                    }
                });
                modalInstance.result.then(function (data) {
                    $scope.workflow.name = data.name;
                    $scope.workflow.description = data.description;
                    $scope.workflow.purpose = data.purpose;
                    $scope.$broadcast('updateBreadcrumb');
                });
            };

            this.getWorkflowSettings = function (workflowId, callback) {
                $http.get(config.API_URL + '/workflow/' + workflowId + '/settings').then(
                    function(data) {
                        callback(null, data.data.data);
                    }
                );
            };

            this.updateWorkflowSettings = function (settings, callback) {
                $http.put(config.API_URL + '/workflow/' + settings.id + '/settings', settings).then(
                    function(data) {
                        callback(null, data.data.data);
                    }
                );
            };

            this.deleteWorkflow = function (workflowId, callback) {
                var modalInstance = $modal.open({
                    templateUrl: '../../views/confirm_modal.html',
                    controller: 'ConfirmModalController',
                    resolve: {
                        message: function () {
                            return 'Kas oled kindel, et soovid antud töövoo kustutada?';
                        }
                    }
                });
                modalInstance.result.then(function (confirm) {
                    if(confirm == true){
                        $http.delete(config.API_URL + '/workflow/' + workflowId).then(
                            function(data) {
                                callback(null, true);
                            }
                        );
                    } else {
                        callback(null, false);
                    }
                });
            };

            this.getWorkflowsManagementList = function (pagination, callback) {

                pagination = pagination  || {};

                $http.get(config.API_URL + '/workflow/management-list', {params: pagination}).then(function (response) {
                    callback(null, response.data.data);
                });
            };

            this.addResourcesToWorkflow = function( workflowId, resourcesIds, callback) {
                var data = {
                    resources: resourcesIds
                };
                $http.put(config.API_URL + '/workflow/' + workflowId + '/add-resources', data).then(
                    function(data) {
                        callback(null, data.data.data);
                    }
                );
            };

            this.addEntuResourcesToWorkflow = function( workflowId, fileIds, callback) {
                var data = {
                    files: fileIds
                };

                $http.put(config.API_URL + '/workflow/' + workflowId + '/add-entu-files', data).then(
                    function(data) {
                        callback(null, data.data.data);
                    }
                );
            };
        }
    ]);
});