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
    'WorkflowSettingsModalController',
    'ConfirmModalController'
], function (angularAMD) {

    angularAMD.controller('ProjectViewController', [ '$scope', '$state', '$stateParams', 'ProjectService','$modal','WorkflowDefinitionService','ResourceService','$log','WorkflowService',
        function($scope, $state, $stateParams, projectService, $modal, workflowDefinitionService, resourceService, $log, workflowService ) {
            $scope.projectId = $stateParams.projectId;
            $scope.canEditProject = false;

            var updateWorkflowsList = function () {
                projectService.getProjectWorkflows($scope.projectId, function (err, workflows) {
                    if(err){
                        console.log(err);
                        return alert('Err');
                    }
                    $scope.workflows = workflows;
                });
            };

            var updateDefinitionsList = function () {
                projectService.getProjectDefinitions($scope.projectId, function (err, definitions) {
                    if(err){
                        return alert('Err');
                    }
                    $scope.definitions = definitions;
                });
            };




            $scope.setProject = function (project) {
                var requiredUserId = $scope.user.id;
                for(var i = 0, length = project.projectUsers.length; i < length; i++){
                    if(project.projectUsers[i].id == requiredUserId && ( project.projectUsers[i].role == 'owner' || project.projectUsers[i].role == 'editor')){
                        $scope.canEditProject = true;
                    }
                }
                $scope.project = project;
            };


            projectService.getProject($scope.projectId, function (err, project) {
                if(err){
                   return alert('Err');
                }
                $scope.setProject(project);

                updateWorkflowsList();
                updateDefinitionsList();
            });

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
                        $scope.$broadcast('resourceUpdated');
                        updateWorkflowsList();
                    }
                });
            };

            $scope.deleteWorkflowDefinition = function( definition ){
                workflowDefinitionService.deleteWorkflowDefinition( definition.id, function (err, success) {
                    if(!err && success){
                        updateDefinitionsList();
                    }
                });
            };
        }]);
});