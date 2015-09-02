define([
    'angularAMD',
    'ng-jstree',
    'ProjectService',
    'footable',
    'chosen',
    'WorkflowAddDefinitionModalController',
    'WorkflowDefinitionService',
    'ResourceTreeController',
    'controller/project/UpdateController'
], function (angularAMD) {

    angularAMD.controller('ProjectViewController', [ '$scope', '$state', '$stateParams', 'ProjectService','$modal','WorkflowDefinitionService','ResourceService','$log',
        function($scope, $state, $stateParams, projectService, $modal, workflowDefinitionService, resourceService, $log ) {
            $log.log('ProjectController');

            $scope.projectId = $stateParams.id;

            projectService.getProject($scope.projectId, function (err, project) {
                if(err){
                   console.log(err);
                   return alert('Err');
                }
                $scope.project = project;
            });

            projectService.getProjectWorkflows($scope.projectId, function (err, workflows) {
                if(err){
                    console.log(err);
                    return alert('Err');
                }
                $scope.workflows = workflows;
            });

            $scope.openDefineWorkflowModal = function () {
                workflowDefinitionService.openAddDefinitionModal($scope, $scope.project);
            };

            $scope.openUpdateModal = function () {
                projectService.openUpdateModal($scope);
            };
        }]);
});