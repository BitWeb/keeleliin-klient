define([
    'angularAMD',
    'filetree',
    'drop-zone'
], function (angularAMD) {

    angularAMD.controller('WorkflowResourceUploadController', [ '$scope', '$state', '$stateParams', '$log',
        function($scope, $state, $stateParams, $log ) {

            $scope.workflowId = $stateParams.id;
            $scope.hideFileTreeTabs = true;

            $scope.resourceUploadParams = {
                workflowId: $stateParams.id
            };
            $scope.uploadFiles = [];

            $scope.fileAddedEvent = function () {
                $scope.reloadResourcesTreeList();
            };


        }]);
});