define([
    'angularAMD',
    'ResourceTypeService',
    'chosen',
    'icheck'
], function(angularAMD) {

    angularAMD.controller('ResourceTypeEditController', ['$scope', '$stateParams', 'ResourceTypeService', '$log','config',
        function( $scope, $stateParams, resourceTypeService, $log, config ) {

            $scope.errorMessage = null;
            $scope.successMessage = null;

            $scope.splitTypes = config.resource_type.split_types;


            $scope.resourceType = {
                value: '',
                name: '',
                splitType: 'NONE'
            };

            var loadResourceTypeFromServer = function () {
                resourceTypeService.getResourceType( $stateParams.id, function (err, item) {
                    if(err){
                        return alert('Err');
                    }
                    $scope.resourceType = item;
                });
            };

            if( $stateParams.id ){
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
                };

                if($scope.resourceType.id){
                    resourceTypeService.updateResourceType( $scope.resourceType, saveCallback);
                } else {
                    resourceTypeService.saveResourceType( $scope.resourceType, saveCallback);
                }
            }
        }]);
});