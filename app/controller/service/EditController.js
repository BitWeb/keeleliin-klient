define([
    'angularAMD',
    'ServiceService',
    'ResourceService',
    'ResourceTypeService',
    'chosen',
    'icheck'
], function(angularAMD) {

    angularAMD.controller('ServiceEditController', ['$scope', '$stateParams', 'ServiceService', 'ResourceService', 'ResourceTypeService' ,'$log', '$state', '$timeout',
        function( $scope, $stateParams, serviceService, resourceService, resourceTypeService, $log, $state, $timeout ) {
            $scope.serviceId = $stateParams.serviceId;
            $scope.errorMessage = null;
            $scope.successMessage = null;

            if($state.parentService){
                $scope.service = serviceService.getServiceCopy($state.parentService);


                $timeout(function () {
                    $scope.serviceForm.$dirty = true;
                }, 100);


            } else {
                $scope.service = {
                    serviceParams: [],
                    serviceInputTypes: [],
                    serviceOutputTypes: []
                };
            }

            var loadServiceFromServer = function () {
                serviceService.getService( $stateParams.serviceId, function (err, data) {
                    if(err){
                        return alert('Err');
                    }
                    console.log(data);
                    $scope.service = data;
                });
            };

            serviceService.getServicesSelectList( function (err, data) {
                if(err){
                    return alert('Err');
                }
                console.log(data);
                $scope.servicesList = data;
            });

            resourceTypeService.getResourceTypesList(function (err, types) {
                if(err){
                    return alert('Err');//todo
                }
                $scope.resourceTypes = types;

                if( $stateParams.serviceId ){
                    loadServiceFromServer();
                }
            });

            //Service param rows
            $scope.addServiceParam = function () {
                $scope.service.serviceParams.push({
                    'type': 'text',
                    'key': '',
                    'value': '',
                    'isEditable': true,
                    'description': '',
                    'paramOptions': []
                });
                $scope.serviceForm.$dirty = true;
            };

            $scope.removeServiceParam = function(index){
                $scope.service.serviceParams.splice(index, 1);
                $scope.serviceForm.$dirty = true;
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

            // input resources

            $scope.addServiceInputType = function () {
                $scope.service.serviceInputTypes.push({});
                $scope.serviceForm.$dirty = true;
            };

            $scope.removeServiceInputType = function (index) {
                $scope.service.serviceInputTypes.splice(index, 1);
                $scope.serviceForm.$dirty = true;
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
                if(!resourceType || resourceType && resourceType.splitType == 'NONE'){
                    return false;
                }
                return true;
            };

            // output resources

            $scope.addServiceOutputType = function () {
                $scope.service.serviceOutputTypes.push({});
                $scope.serviceForm.$dirty = true;
            };

            $scope.removeServiceOutputType = function (index) {
                $scope.service.serviceOutputTypes.splice(index, 1);
                $scope.serviceForm.$dirty = true;
            };

            $scope.saveService = function (form) {

                form.submitted = true;

                if(!form.$valid){
                    $log.info(form);
                    $log.info($scope.service);
                    $scope.errorMessage = 'Vormi valideerimisel tekkis vigu';
                    return;
                }

                form.submitted = true;
                $scope.savingService = true;

                var saveCallback = function (err, data) {
                    $scope.savingService = false;
                    form.submitted = false;
                    form.$dirty = false;

                    if(err || !data){
                        $log.debug('Err', err);

                        $scope.errorMessage = 'Salvestamisel tekkis viga';
                        return;
                    }

                    if(!$scope.service.id && data.id){
                        return $state.go('service-edit', {serviceId: data.id}, {reload:true});
                    }

                    $scope.service = data;
                    $scope.errorMessage = null;
                    $scope.successMessage = 'Salvestatud';
                    $scope.$broadcast('updateBreadcrumb');
                };

                if($scope.service.id){
                    serviceService.updateService( $scope.service, saveCallback);
                } else {
                    serviceService.saveService( $scope.service, saveCallback);
                }
            };

            $scope.deleteService = function () {
                serviceService.deleteService($scope.service, function (err, data) {
                    if(!err){
                        $state.go('services');
                    }
                });
            };

            $scope.copyService = function () {
                $state.go('service-insert');
                $state.parentService = $scope.service;
            };
        }]);
});