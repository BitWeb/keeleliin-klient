define([
    'angularAMD',
    'ServiceService',
    'ResourceService',
    'chosen',
    'icheck'
], function(angularAMD) {

    angularAMD.controller('ServiceEditController', ['$scope', '$stateParams', 'ServiceService', 'ResourceService',
        function( $scope, $stateParams, serviceService, resourceService ) {

            $scope.service = {
                serviceParams: []
            };

            resourceService.getResourceTypes(function (err, types) {
                if(err){
                    return alert('Err');//todo
                }
                $scope.resourceTypes = types;

                serviceService.getService( $stateParams.id, function (err, data) {
                    if(err){
                        return alert('Err');
                    }
                    console.log(data);
                    $scope.service = data;
                });
            });

            $scope.addServiceParam = function () {
                $scope.service.serviceParams.push({
                    'type': 'text',
                    'key': '',
                    'value': '',
                    'isEditable': true,
                    'description': '',
                    'paramOptions': []
                });
            };

            $scope.removeServiceParam = function(index){
                $scope.service.serviceParams.splice(index, 1);
            };

            $scope.addParamOption = function(serviceParam){
                serviceParam.paramOptions.push({
                    value: '',
                    label: ''
                });
            };

            $scope.removeParamOption = function(serviceParam, optionIndex){
                serviceParam.paramOptions.splice(optionIndex, 1);
            };


            var getResourceTypeById = function (id) {
                for(i in $scope.resourceTypes){
                    if($scope.resourceTypes[i].id == id){
                       return $scope.resourceTypes[i];
                    }
                }
            };

            $scope.inputResourceTypeUpdated = function( inputType ){
                var resourceType = getResourceTypeById( inputType.resourceTypeId );
                if(resourceType && resourceType.splitType != 'NONE'){
                    inputType.doParallel = true;
                }
            };

            $scope.canDoParallel = function( inputType ){
                var resourceType = getResourceTypeById( inputType.resourceTypeId );
                if(resourceType && resourceType.splitType == 'NONE'){
                    return false;
                }
                return true;
            };

            $scope.saveService = function (form) {
                form.submitted = true;

                if(!form.$valid){
                    return;
                }

                serviceService.updateService( $scope.service, function (err, data) {
                    if(err){
                        return alert('Err');
                    }
                    console.log(data);

                });
            }
        }]);
});