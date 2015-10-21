define([
    'angularAMD',
    'filetree',
    'entutree',
    'drop-zone',
    'EntuService',
    'WorkflowService'
], function (angularAMD) {

    angularAMD.controller('WorkflowResourceUploadController', [ '$scope', '$state', '$stateParams', '$log','WorkflowService','$rootScope','EntuService',
        function($scope, $state, $stateParams, $log, workflowService, $rootScope, entuService ) {

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

            $scope.entuLoadEnabled = true;
            $scope.addExistingEntuResources = function () {
                $scope.entuLoadEnabled = false;
                var resourcesIds = $scope.getSelectedEntuResources();
                workflowService.addEntuResourcesToWorkflow($stateParams.workflowId, resourcesIds, function (err, data) {
                    $scope.entuLoadEnabled = true;
                    $scope.fileAddedEvent();
                });
            };

        }]);
});