
define(['angularAMD'], function (angularAMD) {
    angularAMD.controller('WorkflowAddModalController',
        [ '$scope', '$state', '$stateParams', 'WorkflowDefinitionService', 'project','$log','config',
            function ($scope, $state, $stateParams, workflowDefinitionService, project, $log, config) {

                $scope.config = config;

                $scope.definitionFilterName = null;

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

                $scope.addWorkflow = function (definitionId) {

                    workflowDefinitionService.createWorkflowFromDefinition(definitionId, project.id, function (err, workflow) {
                        $scope.$dismiss();
                        $state.go('workflow-definition-edit', {workflowId: workflow.id, projectId: project.id});
                    });
                };

                $scope.bookmarkCb = function (definitionId, status) {
                    for(var i = 0, l = definitions.length; i < l; i++){
                        if(definitions[i].id == definitionId){
                            definitions[i].isBookmarked = status;
                        }
                    }
                };

            }])
});