define(['angularAMD'], function (angularAMD) {

    angularAMD.service('WorkflowService', [ '$http', 'config', '$modal',
        function( $http, config, $modal ) {
            var self = this;

            this.getWorkflow = function (workflowId, callback) {
                $http.get(config.API_URL + '/workflow/' + workflowId).then(
                    function(data) {
                        callback(null, data.data);
                    },
                    function(data) {
                        callback(data);
                    }
                );

            };

            this.runWorkflow = function (workflowId, callback) {
                $http.put(config.API_URL + '/workflow/' + workflowId + '/run').then(
                    function(data) {
                        callback(null, data.data);
                    },
                    function(data) {
                        callback(data);
                    }
                );
            };

            this.cancelWorkflow = function (workflowId, callback) {

                $http.put(config.API_URL + '/workflow/' + workflowId + '/cancel').then(
                    function(data) {
                        callback(null, data.data);
                    },
                    function(data) {
                        callback(data);
                    }
                );
            };

            this.openWorkflowSettingsModal = function ($scope, workflowId) {
                return $modal.open({
                    templateUrl: '../../views/workflow/settings_modal.html',
                    scope: $scope,
                    controller: 'WorkflowSettingsModalController',
                    resolve: {
                        workflowId: function(){
                            return workflowId;
                        }
                    }
                });
            };

            this.getWorkflowSettings = function (workflowId, callback) {
                $http.get(config.API_URL + '/workflow/' + workflowId + '/settings').then(
                    function(data) {
                        callback(null, data.data.data);
                    },
                    function(data) {
                        callback(data);
                    }
                );
            };

            this.updateWorkflowSettings = function (settings, callback) {
                $http.put(config.API_URL + '/workflow/' + settings.id + '/settings', settings).then(
                    function(data) {
                        callback(null, data.data.data);
                    },
                    function(data) {
                        callback(data);
                    }
                );
            }

        }
    ]);
});