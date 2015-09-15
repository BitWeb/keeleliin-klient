
define(['angularAMD'], function (angularAMD) {
    angularAMD.controller('WorkflowAddModalController',
        [ '$scope', '$state', '$stateParams', 'WorkflowDefinitionService', 'project','$log',
            function ($scope, $state, $stateParams, workflowDefinitionService, project, $log) {

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
                        $scope.errorMessage = 'Töövoog peab olema valutud';
                        return;
                    }

                    workflowDefinitionService.createWorkflowFromDefinition($scope.workflow.workflowDefinitionId, $stateParams.projectId, function (err, workflow) {
                        $scope.$dismiss();
                        $state.go('workflow-definition-edit', {workflowId: workflow.id});
                    });
                };
            }])
});