/**
 * Kollane6
 *
 *
 *
 * Created by priit on 17.08.15.
 */

define([
    'angularAMD',
    'ProjectService',
    'WorkflowDefinitionService',
    'WorkflowAddDefinitionModalController',
    'WorkflowAddModalController'
], function (angularAMD) {

    angularAMD.controller('HomeController', ['$scope','$state', 'ProjectService','WorkflowDefinitionService', 'UserService', function ($scope, $state, projectService, workflowDefinitionService, userService) {
        console.log('HomeController');
        if(!userService.isAuthenticated()){
            $state.go('auth');
            return;
        }

        projectService.getHomeProject( function (err, project) {
            if(err){
                console.error(err);
                return alert('Err');
            }
            $scope.project = project;
            $scope.projectId = project.id;

            projectService.getProjectWorkflows($scope.projectId, function (err, workflows) {
                if(err){
                    console.error(err);
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