
define([
    'angularAMD',
    'WorkflowDefinitionService',
    'WorkflowService',
    'WorkflowServiceMapper',
    'ServiceService',
    'ui-sortable',
    'filetree',
    'WorkflowSettingsModalController',
    'WorkflowDefinitionServiceSettingsModalController',
    'ServiceInfoModalController'
], function (angularAMD) {
    angularAMD.controller('WorkflowDefinitionEditController',
        [ '$scope', '$state', '$stateParams', 'WorkflowDefinitionService', 'ServiceService', '$log', 'WorkflowService','$modal','WorkflowServiceMapper',
            function ($scope, $state, $stateParams, workflowDefinitionService, serviceService, $log, workflowService, $modal, workflowServiceMapper) {

                $scope.workflowId = $stateParams.workflowId;
                $scope.avaliableServices = [];
                $scope.selectedServices = [];



                serviceService.getDefineServices(function (err, services) {
                    if(err){
                        console.log(err);
                        return alert('Err');
                    }

                    workflowServiceMapper.setServicesList(services);

                    workflowDefinitionService.getWorkflowsDefinition($stateParams.workflowId, function (err, workflow) {
                        if(err){
                            console.log(err);
                            return alert('Err');
                        }
                        $log.debug('Workflow', workflow);
                        $scope.workflow = workflow;
                        $scope.selectedServices = $scope.workflow.workflowDefinition.definitionServices;
                        $scope.updateAvailableServices();
                        $scope.updateSelectedServicesView();
                    });
                });

                $scope.hasEditableSettings = function( id ){
                    var service = workflowServiceMapper.getService(id);

                    if(!service){
                        return false;
                    }

                    for(i in service.serviceParams){
                        if(service.serviceParams[i].isEditable){
                            return true;
                        }
                    }
                    return false;
                };

                $scope.addSelectedService = function ( service ) {

                    var selectedService = {
                        id: null,
                        serviceId: service.id,
                        orderNum: $scope.selectedServices.length,
                        serviceParamsValues: {}
                    };
                    for(i in service.serviceParams){
                        var param = service.serviceParams[i];
                        selectedService.serviceParamsValues[param.key] = param.value;
                    }

                    $scope.selectedServices.push( selectedService );
                    $scope.updateAvailableServices();
                    $scope.updateDefinitionServices();
                };

                $scope.updateAvailableServices = function() {
                    $scope.avaliableServices = workflowServiceMapper.getAvailableFollowingServices( $scope.selectedServices );
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

                $scope.showSettings = function( index ){
                    $modal.open({
                        templateUrl: '../../views/workflow/definition_service_settings_modal.html',
                        controller: 'WorkflowDefinitionServiceSettingsModalController',
                        resolve: {
                            selectedService: function(){
                                return $scope.selectedServices[index];
                            },
                            service: function(){
                                return workflowServiceMapper.getService($scope.selectedServices[index].serviceId);
                            },
                            serviceVersions: function () {
                                return workflowServiceMapper.getSelectedServiceVersions( index, $scope.selectedServices );
                            },
                            willBeCorrectFlowFlow: function () {
                                return function (serviceId) {
                                    return workflowServiceMapper.willBeCorrectFlowFlow( index, serviceId, $scope.selectedServices );
                                }
                            }
                        }
                    }).result.then(function (updatedSelectedService) {

                            if(!workflowServiceMapper.willBeCorrectFlowFlow( index, updatedSelectedService.serviceId, $scope.selectedServices )){
                                removeFromIndex(index + 1);
                            }

                            $scope.selectedServices[index] = updatedSelectedService;
                            $scope.updateAvailableServices();
                            $scope.updateDefinitionServices();
                    }, function () {
                        $log.info('Dismissed');
                    });
                };

                $scope.updateDefinitionServices = function () {
                    workflowDefinitionService.updateDefinitionServices($scope.workflow, $scope.selectedServices, function (err, data) {
                        if(err){
                            alert('Err');
                            return $log.debug(err)
                        }
                    });
                    $scope.updateSelectedServicesView();
                };

                $scope.openWorkflowSettingsModal = function(){
                    workflowService.openWorkflowSettingsModal($scope, $scope.workflow, function (err, workflow) {
                        $scope.workflow = workflow;
                    });
                };

                $scope.editDefinitionServices = function () {
                    $scope.workflow.workflowDefinition.editStatus = 'edit';
                    $scope.updateSelectedServicesView();
                };

                $scope.showServiceInfo = function ( serviceId ) {
                    serviceService.openServiceInfoModal( serviceId );
                };

                var removeFromIndex = function (index) {
                    $scope.selectedServices = $scope.selectedServices.slice(0, index);
                    $scope.updateAvailableServices();
                    $scope.updateDefinitionServices();
                };

                $scope.deleteSelectedServicesFromIndex = function ( index ) {
                    var deleteModal = $modal.open({
                        templateUrl: '../../views/workflow/remove_from_flow_modal.html',
                        scope: $scope
                    });
                    $scope.deleteConfirmed = function () {
                        deleteModal.close();
                        removeFromIndex( index );
                    };
                };

                $scope.runWorkflow = function () {
                    workflowService.runWorkflow($scope.workflow.id, function (err, response) {
                        $state.go('workflow-view', {workflowId: $scope.workflow.id});
                    });
                };


                $scope.updateSelectedServicesView = function () {
                    var mapping = [];
                    for(var i = 0; i < $scope.selectedServices.length; i++){
                        var selectedService = $scope.selectedServices[i];
                        var service = workflowServiceMapper.getService(selectedService.serviceId);
                        var mappingObject = {
                            index: i,
                            orderNum: selectedService.orderNum,
                            serviceId: service ? service.id : null,
                            name: service ? service.name : '',
                            canDelete: $scope.workflow.workflowDefinition.editStatus != 'locked',
                            canEditSettings: service && $scope.workflow.workflowDefinition.editStatus != 'locked'
                        };
                        mapping.push(mappingObject);
                    }
                    $scope.selectedMap = mapping;
                }
            }]);
});