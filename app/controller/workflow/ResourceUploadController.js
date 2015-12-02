define([
    'angularAMD',
    'filetree',
    'entutree',
    'drop-zone',
    'EntuService',
    'WorkflowService',
    'ResourceService'
], function (angularAMD) {

    angularAMD.controller('WorkflowResourceUploadController', [ '$scope', '$state', '$stateParams', '$log','WorkflowService','$rootScope','EntuService','ResourceService',
        function($scope, $state, $stateParams, $log, workflowService, $rootScope, entuService, resourceService ) {

            $scope.workflowId = $stateParams.workflowId;

            $scope.resourceUploadParams = {
                workflowId: $stateParams.workflowId
            };
            $scope.uploadFiles = [];

            $scope.fileAddedEvent = function () {
                $rootScope.$broadcast('resourceUpdated');
            };

            $scope.addExistingResources = function () {
                var data = {
                    resourceIds: $scope.getSelectedResources(),
                    projectId: $stateParams.projectId,
                    workflowId: $stateParams.workflowId
                };
                resourceService.addAssociations(data, function (err, data) {
                    $scope.fileAddedEvent();
                });
            };

            $scope.entuLoadEnabled = true;
            $scope.addExistingEntuResources = function () {
                $scope.entuLoadEnabled = false;

                var data = {
                    files: $scope.getSelectedEntuResources(),
                    projectId: $stateParams.projectId,
                    workflowId: $stateParams.workflowId
                };

                resourceService.loadFromEntu(data, function (err, data) {
                    $scope.entuLoadEnabled = true;
                    $scope.fileAddedEvent();
                });
            };


            $scope.download = {
                name: '',
                url: '',
                projectId: $stateParams.projectId,
                workflowId: $stateParams.workflowId
            };

            $scope.loadingFromUrl = false;
            $scope.loadFromUrl = function ( urlForm ) {
                urlForm.submitted = true;
                if(!urlForm.$valid){
                    return;
                }

                $scope.loadingFromUrl = true;
                resourceService.loadFromUrl($scope.download, function (err, resource) {
                    if(err){
                        console.log(err);
                        return;
                    }
                    console.log('Uploaded');
                    $scope.loadingFromUrl = false;
                    urlForm.submitted = false;
                    $scope.fileAddedEvent();
                    $scope.download.name = '';
                    $scope.download.url = '';
                });
            };

            $scope.runWorkflow = function () {
                workflowService.runWorkflow($scope.workflowId, function (err, response) {
                    if(err){
                        $log.debug(err);
                        return alert('Err');
                    }
                    $state.go('workflow-view', { workflowId: $scope.workflowId });
                });
            };

        }]);
});