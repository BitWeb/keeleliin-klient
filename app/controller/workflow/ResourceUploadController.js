define([
    'angularAMD',
    'filetree',
    'entutree',
    'drop-zone',
    'ResourceService',
    'EntuService',
    'WorkflowService',
    'ResourceMultiselectController'
], function (angularAMD) {

    angularAMD.controller('WorkflowResourceUploadController', [ '$scope', '$state', '$stateParams', '$log', 'ResourceService','WorkflowService','$rootScope','EntuService',
        function($scope, $state, $stateParams, $log, resourceService, workflowService, $rootScope, entuService ) {

            $scope.workflowId = $stateParams.workflowId;

            $scope.resourceUploadParams = {
                workflowId: $stateParams.workflowId
            };
            $scope.uploadFiles = [];

            $scope.fileAddedEvent = function () {
                $rootScope.$broadcast('resourceUpdated');
            };

            $scope.addExistingResources = function () {
                var resourcesIds = $scope.getSelectedResources();
                workflowService.addResourcesToWorkflow($stateParams.workflowId, resourcesIds, function (err, data) {
                    $scope.fileAddedEvent();
                });
            };

            $scope.addExistingEntuResources = function () {
                var resourcesIds = $scope.getSelectedEntuResources();
                workflowService.addEntuResourcesToWorkflow($stateParams.workflowId, resourcesIds, function (err, data) {
                    $scope.fileAddedEvent();
                });
            };

        }]);
});