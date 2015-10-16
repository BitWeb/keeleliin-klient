define([
    'angularAMD',
    'filetree',
    'drop-zone'
], function (angularAMD) {

    angularAMD.controller('ProjectResourceUploadController', [ '$scope', '$state', '$stateParams', '$log','$rootScope',
        function($scope, $state, $stateParams, $log, $rootScope ) {

            $scope.projectId = $stateParams.projectId;

            $scope.resourceUploadParams = {
                projectId: $stateParams.projectId
            };
            $scope.uploadFiles = [];

            $scope.fileAddedEvent = function () {
                $rootScope.$broadcast('resourceUpdated');
            };
        }]);
});