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

        }
    ]);
});