define([
    'angularAMD',
    'ng-jstree',
    'ProjectService',
    'footable',
    'WorkflowAddDefinitionModalController',
    'WorkflowDefinitionService',
    'ResourceService'
], function (angularAMD) {

    angularAMD.controller('ProjectController', [ '$scope', '$state', '$stateParams', 'ProjectService','$modal','WorkflowDefinitionService','ResourceService',
        function($scope, $state, $stateParams, projectService, $modal, workflowDefinitionService, resourceService) {
            console.log('ProjectController');

            var projectId = $stateParams.id;

            projectService.getProject(projectId, function (err, project) {
                if(err){
                   console.log(err);
                   return alert('Err');
                }
                $scope.project = project;
            });

            projectService.getProjectWorkflows(projectId, function (err, workflows) {
                if(err){
                    console.log(err);
                    return alert('Err');
                }
                $scope.workflows = workflows;
            });

            $scope.openDefineWorkflowModal = function () {
                workflowDefinitionService.openAddDefinitionModal($scope, $scope.project);
            };



            var resources = {};

            resourceService.getResourcesList({ projectId: projectId, workflowId : 68 }, function(err, data){
                if(err){
                   console.error(err);
                    return alert('ERR');//todo
                }

                resources = resourceService.getJsTreeMapByWorkflow(data);

                console.log(resources);

                $scope.resources = resources;

                $scope.treeConfig = {

                    'plugins' : [ 'types', 'dnd' ],
                    'types' : {
                        'default' : {
                            'icon' : 'fa fa-folder'
                        },
                        'text' : {
                            'icon' : 'fa fa-file-text-o'
                        }
                    }
                };

                $scope.readyCB = function() {
                    console.info('ready called');
                };

                $scope.createNodeCB = function(e,item) {
                    console.info('create_node called');
                };


            });



        }]);
});