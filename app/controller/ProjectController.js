define([
    'angularAMD',
    'ng-jstree',
    'ProjectService',
    'footable',
    'WorkflowAddDefinitionModalController',
    'WorkflowDefinitionService',
    'ResourceTreeController'
], function (angularAMD) {

    angularAMD.controller('ProjectController', [ '$scope', '$state', '$stateParams', 'ProjectService','$modal','WorkflowDefinitionService','ResourceService','$log', '$timeout',
        function($scope, $state, $stateParams, projectService, $modal, workflowDefinitionService, resourceService, $log ) {
            console.log('ProjectController');

            $log.debug('HOLA');

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

        }]);
});