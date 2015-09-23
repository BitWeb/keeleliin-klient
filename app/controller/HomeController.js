/**
 * Created by priit on 17.08.15.
 */

define([
    'angularAMD',
    'ProjectService',
    'WorkflowDefinitionService',
    'WorkflowAddDefinitionModalController',
    'WorkflowAddModalController'
], function (angularAMD) {

    angularAMD.controller('HomeController', ['$scope','ProjectService','WorkflowDefinitionService', function ($scope, projectService, workflowDefinitionService) {

        console.log('HomeController');

        projectService.getHomeProject( function (err, project) {
            if(err){
                console.log(err);
                return alert('Err');
            }
            $scope.project = project;
            $scope.projectId = project.id;

            projectService.getProjectWorkflows($scope.projectId, function (err, workflows) {
                if(err){
                    console.log(err);
                    return alert('Err');
                }
                $scope.workflows = workflows;
            });
        });

        $scope.openDefineWorkflowModal = function () {
            workflowDefinitionService.openAddDefinitionModal($scope, $scope.project);
        };

        $scope.openAddWorkflowModal = function () {
            workflowDefinitionService.openAddWorkflowModal($scope, $scope.project);
        };

    }]);
});