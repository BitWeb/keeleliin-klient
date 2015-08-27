define([
    'angularAMD',
    'ng-jstree',
    'ProjectService',
    'footable',
    'WorkflowAddDefinitionModalController',
    'WorkflowDefinitionService',
    'ResourceService'
], function (angularAMD) {

    angularAMD.controller('ProjectController', [ '$scope', '$state', '$stateParams', 'ProjectService','$modal','WorkflowDefinitionService','ResourceService','$log', '$timeout',
        function($scope, $state, $stateParams, projectService, $modal, workflowDefinitionService, resourceService, $log, $timeout) {
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
            var filterType = null;
            resourceService.getResourcesList({ projectId: projectId }, function(err, data){
                if(err){
                   console.error(err);
                    return alert('ERR');//todo
                }
                resources = data;

                $scope.resources = resourceService.getJsTreeMapByWorkflow(resources, null);
                $scope.treeConfig.version++;
            });

            $scope.treeConfig = {
                core : {
                    multiple : false,
                    animation: true,
                    error : function(error) {
                        $log.error('treeCtrl: error from js tree - ' + angular.toJson(error));
                    },
                    worker : true
                },
                'plugins' : [ 'types', 'dnd' ],
                'types' : {
                    'default' : {
                        'icon' : 'fa fa-folder'
                    },
                    'text' : {
                        'icon' : 'fa fa-file-text-o'
                    }
                },
                version : 1
            };

            $scope.readyCB = function() {
                console.info('Tree');
            };

            $scope.createNodeCB = function(e,item) {
                console.info('create_node called');
                console.info(e);
                console.info(item);

            };

            $scope.applyModelChanges = function () {
                return false;
            }

            $scope.filterFiles = function (type) {
                filterType = type;
                var newList = resourceService.getJsTreeMapByWorkflow(resources, filterType);
                console.log($scope.resources);
                angular.copy(newList, $scope.resources);
                $scope.treeConfig.version++;
            };

            $scope.logSelected = function () {
                var selected_nodes = $scope.treeInstance.jstree(true).get_selected();
                console.log(selected_nodes);
            }

        }]);
});