define([
    'angularAMD',
    'ng-jstree',
    'ProjectService',
    'WorkflowService',
    'footable',
    'WorkflowAddDefinitionModalController',
    'WorkflowAddModalController',
    'WorkflowDefinitionService',
    'filetree',
    'controller/project/UpdateController',
    'ConfirmModalController'
], function (angularAMD) {

    angularAMD.controller('ProjectViewController', [ '$scope', '$state', '$stateParams', 'ProjectService','$modal','WorkflowDefinitionService','ResourceService','$log','WorkflowService',
        function($scope, $state, $stateParams, projectService, $modal, workflowDefinitionService, resourceService, $log, workflowService ) {
            $log.log('ProjectController');

            $scope.projectId = $stateParams.projectId;

            projectService.getProject($scope.projectId, function (err, project) {
                if(err){
                   console.log(err);
                   return alert('Err');
                }
                $scope.project = project;
            });

            var updateWorkflowsList = function () {
                projectService.getProjectWorkflows($scope.projectId, function (err, workflows) {
                    if(err){
                        console.log(err);
                        return alert('Err');
                    }
                    $scope.workflows = workflows;
                });
            };
            updateWorkflowsList();

            $scope.openDefineWorkflowModal = function () {
                workflowDefinitionService.openAddDefinitionModal($scope, $scope.project);
            };

            $scope.openAddWorkflowModal = function () {
                workflowDefinitionService.openAddWorkflowModal($scope, $scope.project);
            };

            $scope.openUpdateModal = function () {
                projectService.openUpdateModal($scope);
            };

            $scope.deleteWorkflow = function (workflow) {
                workflowService.deleteWorkflow(workflow.id, function (err, success) {
                    if(!err && success){
                        $scope.reloadResourcesTreeList();
                        updateWorkflowsList();
                    }
                });
            }

        }]);
});