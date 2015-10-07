define([
    'angularAMD'
], function (angularAMD) {

    angularAMD.controller('ResourceDeleteController', [ '$scope', '$rootScope', '$state', '$stateParams', '$log', 'ResourceService', 'resourceData',
        function($scope, $rootScope, $state, $stateParams, $log, resourceService, associationData ) {

            resourceService.getResourceInfo( associationData.resourceId, function (err, info) {
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

                resourceService.deleteResourceAssociation(associationData.id, function (err, data) {
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