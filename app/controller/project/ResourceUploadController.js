define([
    'angularAMD',
    'filetree',
    'drop-zone'
], function (angularAMD) {

    angularAMD.controller('ProjectResourceUploadController', [ '$scope', '$state', '$stateParams', '$log',
        function($scope, $state, $stateParams, $log ) {

            $scope.projectId = $stateParams.projectId;
            $scope.hideFileTreeTabs = false;

            $scope.resourceUploadParams = {
                projectId: $stateParams.projectId
            };
            $scope.uploadFiles = [];

            $scope.fileAddedEvent = function () {
                $scope.reloadResourcesTreeList();
            };
        }]);
});