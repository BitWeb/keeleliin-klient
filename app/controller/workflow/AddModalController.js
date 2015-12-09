
define(['angularAMD'], function (angularAMD) {
    angularAMD.controller('WorkflowAddModalController',
        [ '$scope', '$state', '$stateParams', 'WorkflowDefinitionService', 'project','$log','config',
            function ($scope, $state, $stateParams, workflowDefinitionService, project, $log, config) {

                $scope.filter = {
                    name: '',
                    order: 'name_asc',
                    type: null
                };

                $scope.definitionOrderByOptions = ['name_asc','name_desc','created_at_asc','created_at_desc', 'used_asc', 'used_desc', 'bookmarked_asc', 'bookmarked_desc'];

                $scope.config = config;

                var definitions = [];

                $scope.updateType = function(type){
                    $scope.filter.type = type;
                    $scope.updateList();
                };

                $scope.updateList = function () {
                    workflowDefinitionService.getWorkflowsDefinitionsList( $scope.filter, function (err, data) {
                        $log.debug(data);
                        definitions = data;
                        $scope.definitions = definitions;
                    });
                };
                $scope.updateList();

                $scope.addWorkflow = function (definitionId) {

                    workflowDefinitionService.createWorkflowFromDefinition(definitionId, project.id, function (err, workflow) {
                        $scope.$dismiss();
                        $state.go('workflow-definition-edit', {workflowId: workflow.id, projectId: project.id});
                    });
                };
            }])
});