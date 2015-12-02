define([
    'angularAMD',
    'filetree',
    'entutree',
    'drop-zone',
    'EntuService',
    'ProjectService',
    'ResourceService'
], function (angularAMD) {

    angularAMD.controller('ProjectResourceUploadController', [ '$scope', '$state', '$stateParams', '$log','$rootScope', 'ProjectService','ResourceService',
        function($scope, $state, $stateParams, $log, $rootScope, projectService, resourceService ) {

            $scope.projectId = $stateParams.projectId;

            $scope.resourceUploadParams = {
                projectId: $stateParams.projectId
            };
            $scope.uploadFiles = [];

            $scope.fileAddedEvent = function () {
                $rootScope.$broadcast('resourceUpdated');
            };

            $scope.addExistingResources = function () {
                var data = {
                    resourceIds: $scope.getSelectedResources(),
                    projectId: $stateParams.projectId
                };
                resourceService.addAssociations(data, function (err, data) {
                    $scope.fileAddedEvent();
                });
            };

            $scope.entuLoadEnabled = true;
            $scope.addExistingEntuResources = function () {
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
                projectId: $stateParams.projectId
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
        }]);
});