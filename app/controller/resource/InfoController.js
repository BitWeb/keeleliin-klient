define([
    'angularAMD',
    'ResourceService',
    'ResourceTypeService'
], function (angularAMD) {

    angularAMD.controller('ResourceInfoController', [ '$scope', '$rootScope', '$log', 'ResourceService','ResourceTypeService', 'resourceId',
        function($scope, $rootScope, $log, resourceService, resourceTypeService, resourceId ) {

            resourceService.getResourceInfo( resourceId, function (err, info) {
                if(err){
                    alert('Err');
                    return $log.error(err);
                }
                $scope.resource = info;
            });

            resourceTypeService.getResourceTypesList(function (err, types) {
                if(err){
                    return alert('Err');
                }
                $scope.resourceTypes = types;
            });

            $scope.download = function () {
                resourceService.downloadResourceById( $scope.resource.id );
            };

            $scope.save = function ( form ) {
                form.submitted = true;
                if(!form.$valid){
                    $log.info(form);
                    $log.info($scope.service);
                    return;
                }

                resourceService.updateResourceInfo($scope.resource, function (err, data) {
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