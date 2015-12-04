define([
    'angularAMD',
    'ProjectService',
    'WorkflowService',
    'WorkflowDefinitionService',
    'ServiceService',
    'ServiceInfoModalController',
    'WorkflowDefinitionSettingsModalController'
], function (angularAMD) {

    angularAMD.controller('WorkflowDefinitionViewController', [ '$scope','$rootScope', '$state', '$stateParams', '$log', 'WorkflowService', 'WorkflowDefinitionService','ProjectService','ServiceService',
        function($scope, $rootScope, $state, $stateParams, $log, workflowService, workflowDefinitionService, projectService, serviceService ) {

            $scope.definitionId = $stateParams.definitionId;
            $scope.projectId = $stateParams.projectId;

            workflowDefinitionService.getDefinitionOverview($stateParams.definitionId, function (err, data) {
                if(err){
                    $log.error(err);
                    return alert('Err');
                }
                $scope.definition = data;
            });


            $scope.addResources = function () {
                workflowDefinitionService.createWorkflowFromDefinition( $scope.definition.id, $scope.projectId, function (err, workflow) {
                    $state.go('workflow-resource-upload', {workflowId: workflow.id, projectId: $scope.projectId});
                });
            };

            $scope.editServices = function () {
                workflowDefinitionService.createWorkflowFromDefinition( $scope.definition.id, $scope.projectId, function (err, workflow) {
                    $state.go('workflow-definition-edit', {workflowId: workflow.id, projectId: $scope.projectId});
                });
            };

            $scope.showServiceInfo = function ( serviceId ) {
                serviceService.openServiceInfoModal( serviceId );
            };

            $scope.openDefinitionSettingsModal = function () {
                workflowDefinitionService.openDefinitionSettingsModal($scope, $scope.definition, function (err, definition) {
                    $scope.definition = definition;
                });
            };

            $scope.getOwner = function( definition ){
                for(var i = 0; i< definition.sharedUsers.length; i++){
                    if(definition.sharedUsers[i].role == 'owner'){
                        return definition.sharedUsers[i].user.name;
                    }
                }
                return '';
            };

        }]);
});