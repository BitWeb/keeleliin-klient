define([
    'angularAMD',
    'filetree',
    'drop-zone'
], function (angularAMD) {

    angularAMD.controller('WorkflowResourceUploadController', [ '$scope', '$state', '$stateParams', '$log',
        function($scope, $state, $stateParams, $log ) {

            $scope.workflowId = $stateParams.workflowId;

            $scope.hideFileTreeTabs = true;

            $scope.resourceUploadParams = {
                workflowId: $stateParams.workflowId
            };
            $scope.uploadFiles = [];

            $scope.fileAddedEvent = function () {
                $scope.reloadResourcesTreeList();
            };
        }]);
});