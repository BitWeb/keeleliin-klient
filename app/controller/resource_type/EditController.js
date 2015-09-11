define([
    'angularAMD',
    'ResourceTypeService',
    'chosen',
    'icheck'
], function(angularAMD) {

    angularAMD.controller('ResourceTypeEditController', ['$scope', '$rootScope', '$stateParams', 'ResourceTypeService', '$log','config',

        function( $scope, $rootScope, $stateParams, resourceTypeService, $log, config ) {
            $scope.resourceTypeId = $stateParams.resourceTypeId;
            $scope.errorMessage = null;
            $scope.successMessage = null;

            $scope.splitTypes = config.resource_type.split_types;


            $scope.resourceType = {
                value: '',
                name: '',
                splitType: 'NONE'
            };

            var loadResourceTypeFromServer = function () {
                resourceTypeService.getResourceType( $stateParams.resourceTypeId, function (err, item) {
                    if(err){
                        return alert('Err');
                    }
                    $scope.resourceType = item;
                });
            };

            if( $stateParams.resourceTypeId ){
                loadResourceTypeFromServer();
            }

            $scope.saveResourceType = function (form) {
                $scope.message = null;
                form.submitted = true;
                if(!form.$valid){
                    $log.info(form);
                    $log.info($scope.service);
                    $scope.errorMessage = 'Vormi valideerimisel tekkis vigu';
                    return;
                }

                var saveCallback = function (err, data) {
                    if(err || !data){
                        $log.debug('Err', err);

                        $scope.errorMessage = 'Salvestamisel tekkis viga';
                        return;
                    }
                    $scope.resourceType = data;
                    form.submitted = false;
                    $scope.message = 'Salvestatud';

                    $scope.$broadcast('updateBreadcrumb');

                };

                if($scope.resourceType.id){
                    resourceTypeService.updateResourceType( $scope.resourceType, saveCallback);
                } else {
                    resourceTypeService.saveResourceType( $scope.resourceType, saveCallback);
                }
            }
        }]);
});