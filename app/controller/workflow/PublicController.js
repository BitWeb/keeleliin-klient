define([
    'angularAMD',
    'ProjectService',
    'WorkflowService',
    'WorkflowDefinitionService',
    'ServiceService',
    'ServiceInfoModalController'
], function (angularAMD) {

    angularAMD.controller('WorkflowPublicController', [ '$scope','$rootScope', '$state', '$stateParams', '$log', 'WorkflowService', 'WorkflowDefinitionService','ProjectService','ServiceService',
        function($scope, $rootScope, $state, $stateParams, $log, workflowService, workflowDefinitionService, projectService, serviceService ) {

            $scope.definitionId = $stateParams.definitionId;

            projectService.getHomeProject( function (err, project) {
                if (err) {
                    console.error(err);
                    return alert('Err');
                }
                if (!project) {
                    return;
                }

                $scope.project = project;
                $scope.projectId = project.id;

                workflowDefinitionService.getDefinitionOverview($stateParams.definitionId, function (err, data) {
                    if(err){
                        $log.error(err);
                        return alert('Err');
                    }
                    $scope.definition = data;
                });
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