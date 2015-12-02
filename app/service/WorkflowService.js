define(['angularAMD'], function (angularAMD) {

    angularAMD.service('WorkflowService', [ '$http', 'config', '$modal', 'UserService', '$log',
        function( $http, config, $modal, userService, $log ) {
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

            this.openWorkflowSettingsModal = function ($scope, workflow, cb) {
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
                    workflow.name = data.name;
                    workflow.description = data.description;
                    workflow.purpose = data.purpose;
                    $scope.$broadcast('updateBreadcrumb');
                    cb(null, workflow);
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

            this.getWorkflowFromWorkflow = function (workflowId, callback) {
                $http.get(config.API_URL + '/workflow/'+ workflowId +'/copy').then(function (response) {
                    callback(null, response.data.data);
                });
            };

            this.downloadLog = function( workflowId ){
                var url = config.API_URL + '/workflow/' + workflowId + '/log?token=' + userService.getToken();
                $log.debug( url );
                window.location.href = url;
            };
        }
    ]);
});