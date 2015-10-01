define([
    'angularAMD'
], function (angularAMD) {

    angularAMD.controller('ResourceDeleteController', [ '$scope', '$rootScope', '$state', '$stateParams', '$log', 'ResourceService', 'resource',
        function($scope, $rootScope, $state, $stateParams, $log, resourceService, resource ) {

            resourceService.getResourceInfo( resource.id, function (err, info) {
                if(err){
                    alert('Err');
                    return $log.error(err);
                }
                $scope.resource = info;
            });

            $scope.download = function () {
                resourceService.downloadResourceById( $scope.resource.id );
            };

            $scope.deleteResource = function ( form ) {

                form.submitted = true;
                if(!form.$valid){
                    console.log('Form invalid');
                    return;
                }

                var deleteData = {
                    context: resource.context,
                    projectId: resource.projectId,
                    serviceId: resource.serviceId,
                    workflowId: resource.workflowId
                };

                resourceService.deleteResource($scope.resource, deleteData, function (err, data) {
                    if(err){
                        alert('Err');
                        return $log.error(err);
                    }
                    $rootScope.$broadcast('resourceUpdated');
                    $scope.$dismiss();
                });
            };
        }]);
});