define([
    'angularAMD',
    'ServiceService',
    'ResourceTypeService'
], function (angularAMD) {

    angularAMD.controller('ServiceInfoModalController', [ '$scope', 'ServiceService','ResourceTypeService','serviceId',
        function($scope, serviceService, resourceTypeService, serviceId) {

            serviceService.getService(serviceId, function (err, service) {
                $scope.service = service;

                resourceTypeService.getResourceTypesList(function (err, types) {

                    $scope.inputTypes = service.serviceInputTypes.map(function (inputType) {
                        for(i in types){
                            if(inputType.resourceTypeId == types[i].id){
                                return types[i].name;
                            }
                        }
                    });

                    $scope.outputTypes = service.serviceOutputTypes.map(function (outputType) {
                        for(i in types){
                            if(outputType.resourceTypeId == types[i].id){
                                return types[i].name;
                            }
                        }
                    });
                });

            });


            $scope.getInputTypes = function () {

            };

            $scope.getOutputTypes = function () {

            };


        }]);
});