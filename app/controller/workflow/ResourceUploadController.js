define([
    'angularAMD',
    'filetree',
    'drop-zone',
    'ResourceService',
    'WorkflowService',
    'ResourceMultiselectController'
], function (angularAMD) {

    angularAMD.controller('WorkflowResourceUploadController', [ '$scope', '$state', '$stateParams', '$log', 'ResourceService','WorkflowService',
        function($scope, $state, $stateParams, $log, resourceService, workflowService ) {

            $scope.workflowId = $stateParams.workflowId;

            $scope.hideFileTreeTabs = true;

            $scope.resourceUploadParams = {
                workflowId: $stateParams.workflowId
            };
            $scope.uploadFiles = [];

            $scope.fileAddedEvent = function () {
                $scope.reloadResourcesTreeList();
            };

            $scope.selectExistingResources = function () {
                var modalInstance = resourceService.openResourceMultiselectModal();
                modalInstance.result.then(function (resourcesIds) {
                    workflowService.addResourcesToWorkflow($stateParams.workflowId, resourcesIds, function (err, data) {
                        $scope.fileAddedEvent();
                    });
                });
            };
        }]);
});