define([
    'angularAMD',
    'filetree',
    'entutree',
    'drop-zone',
    'EntuService',
    'ProjectService'
], function (angularAMD) {

    angularAMD.controller('ProjectResourceUploadController', [ '$scope', '$state', '$stateParams', '$log','$rootScope', 'ProjectService',
        function($scope, $state, $stateParams, $log, $rootScope, projectService ) {

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

        }]);
});