define([
    'angularAMD'
], function (angularAMD) {

    angularAMD.controller('ResourceDeleteController', [ '$scope', '$rootScope', '$state', '$stateParams', '$log', 'ResourceService', 'resourceId',
        function($scope, $rootScope, $state, $stateParams, $log, resourceService, resourceId ) {

            $scope.deleteData = {};

            resourceService.getResourceInfo( resourceId, function (err, info) {
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

                resourceService.deleteResource($scope.resource, $scope.deleteData, function (err, data) {
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