
define([
    'angularAMD',
    'WorkflowDefinitionService',
    'WorkflowService',
    'ServiceService',
    'ui-sortable',
    'filetree'
], function (angularAMD) {
    angularAMD.controller('WorkflowDefinitionEditController',
        [ '$scope', '$state', '$stateParams', 'WorkflowDefinitionService', 'ServiceService', '$log', 'WorkflowService',
            function ($scope, $state, $stateParams, workflowDefinitionService, serviceService, $log, workflowService) {

                $scope.workflowId = $stateParams.workflowId;
                $scope.hideFileTreeTabs = true;

                $scope.hideFileTreeTabs = true;
                $scope.avaliableServices = [];
                $scope.selectedServices = [];

                var servicesList = [];

                serviceService.getDefineServices(function (err, services) {
                    if(err){
                        console.log(err);
                        return alert('Err');
                    }
                    servicesList = services;
                    workflowDefinitionService.getWorkflowsDefinition($stateParams.workflowId, function (err, workflow) {
                        if(err){
                            console.log(err);
                            return alert('Err');
                        }
                        $log.debug('Workflow', workflow);
                        $scope.workflow = workflow;
                        $scope.selectedServices = $scope.workflow.workflowDefinition.definitionServices;
                        $scope.updateAvailableServices();
                    });
                });

                $scope.getServiceById = function (id) {
                    return workflowDefinitionService.getServiceFromList(id, servicesList);
                };

                $scope.addSelectedService = function ( service ) {

                    var selectedService = {
                        id: null,
                        serviceId: service.id,
                        orderNum: $scope.selectedServices.length,
                        paramValues: []
                    };
                    for(i in service.serviceParams){
                        var param = service.serviceParams[i];

                        if(param.isEditable == false){
                            continue;
                        }
                        selectedService.paramValues.push({
                            id: null,
                            serviceParamId: param.id,
                            value: param.value
                        });
                    }
                    $scope.selectedServices.push( selectedService );
                    console.log( $scope.workflow.workflowDefinition.definitionServices );
                    $scope.updateAvailableServices();
                    $scope.updateDefinitionServices();
                };

                $scope.updateAvailableServices = function() {
                    $scope.avaliableServices = workflowDefinitionService.getAvailableFollowingServices( $scope.selectedServices, servicesList );
                };

                $scope.removeSelectedServicesFromIndex = function ( index ) {
                    $scope.selectedServices = $scope.selectedServices.slice(0, index);
                    $scope.updateAvailableServices();
                    $scope.updateDefinitionServices();
                };

                $scope.droppedServices = [];
                $scope.dragging = false;
                $scope.dropzone = {};
                $scope.draggable = {
                    connectWith: ".dropzone",
                    placeholder: 'sortable_placeholder',
                    start: function (e, ui) {
                        $scope.$apply(function() {
                            $scope.dragging = true
                        });
                        $('.dropzone').sortable('refresh');
                    },
                    update: function (e, ui) {
                        if (ui.item.sortable.droptarget[0].classList[0] !== "dropzone")
                            ui.item.sortable.cancel();
                    },
                    stop: function (e, ui) {
                        if (ui.item.sortable.droptarget == undefined) {
                            return $scope.$apply($scope.dragging = false);
                        }else if (ui.item.sortable.droptarget[0].classList[0] == "dropzone") {
                            $scope.$apply($scope.dragging = false);
                            $scope.$apply($scope.addSelectedService($scope.droppedServices.pop()));
                            $scope.$apply($scope.droppedServices = []);
                        }else{
                            $scope.$apply($scope.dragging = false);
                        }
                    }
                };

                $scope.showInfo = function( selectedService ){
                  alert(' todo info ' + selectedService.serviceId);
                };

                $scope.showSettings = function( selectedService ){
                    alert('todo settings ' + selectedService.serviceId);
                };

                $scope.updateDefinitionServices = function () {
                    workflowDefinitionService.updateDefinitionServices($scope.workflow, $scope.selectedServices, function (err, data) {
                        if(err){
                            alert('Err');
                            return $log.debug(err)
                        }
                        $log.debug( data);
                    });
                };


                $scope.runWorkflow = function () {

                    workflowService.runWorkflow($scope.workflow.id, function (err, response) {
                        if(err){
                            $log.debug(err);
                            return alert('Err');
                        }
                        $state.go('workflow-view', {workflowId: $scope.workflow.id});
                    });
                };
            }]);
});