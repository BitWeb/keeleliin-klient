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
                var resourcesIds = $scope.getSelectedResources();
                projectService.addResourcesToProject($stateParams.projectId, resourcesIds, function (err, data) {
                    $scope.fileAddedEvent();
                });
            };

            $scope.entuLoadEnabled = true;
            $scope.addExistingEntuResources = function () {
                $scope.entuLoadEnabled = false;
                var resourcesIds = $scope.getSelectedEntuResources();
                projectService.addEntuResourcesToProject($stateParams.projectId, resourcesIds, function (err, data) {
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