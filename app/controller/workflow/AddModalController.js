
define(['angularAMD'], function (angularAMD) {
    angularAMD.controller('WorkflowAddModalController',
        [ '$scope', '$state', '$stateParams', 'WorkflowDefinitionService', 'project','$log','config',
            function ($scope, $state, $stateParams, workflowDefinitionService, project, $log, config) {

                $scope.config = config;

                $scope.definitionFilterName = null;

                $scope.workflow = {
                    workflowDefinitionId: null
                };

                $scope.selectedDefinitionId = null;

                var definitions = [];

                $scope.updateList = function (type) {
                    $scope.definitions = workflowDefinitionService.filterDefinitionsList(definitions, type, $scope.definitionFilterName);
                };

                workflowDefinitionService.getWorkflowsDefinitionsList({}, function (err, data) {
                    $log.debug(data);
                    definitions = data;
                    $scope.updateList(null);
                });

                $scope.addWorkflow = function () {
                    $scope.errorMessage = null;
                    if(!$scope.workflow.workflowDefinitionId){
                        $scope.errorMessage = 'Töövoog peab olema valitud';
                        return;
                    }

                    workflowDefinitionService.createWorkflowFromDefinition($scope.workflow.workflowDefinitionId, project.id, function (err, workflow) {
                        $scope.$dismiss();
                        $state.go('workflow-definition-edit', {workflowId: workflow.id, projectId: project.id});
                    });
                };
            }])
});