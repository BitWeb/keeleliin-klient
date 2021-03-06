define([
        'angularAMD',
        'ResourceService'
    ],
    function (angularAMD) {

        angularAMD.directive('filetree', [ '$log','$rootScope', '$compile', 'ResourceService',
            function( $log, $rootScope, $compile, resourceService) {

                return {
                    scope: {
                        projectId: '@',
                        workflowId: '@',
                        getSelected: '=',
                        reloadTree: '='
                    },
                    restrict: 'A',
                    transclude: true,
                    templateUrl: 'views/resource/filetree.html',
                    link: function( $scope, $element, $attrs ){
                        console.log("jsFileTreeDir");
                        $scope.resources = [];
                        var resourcesMap = {};
                        var resourcesList = {};

                        var resourceParams = {
                            projectId: $scope.projectId,
                            workflowId: $scope.workflowId
                        };

                        $log.debug('Filetree params: ', resourceParams);


                        $scope.fileDownloadAction = function (event, id) {
                            resourceService.downloadResourceById( resourcesMap[id].resourceId );
                        };

                        $scope.fileInfoAction = function (event, id) {
                            resourceService.openInfoModal( resourcesMap[id].resourceId );
                        };

                        $scope.fileDeleteAction = function (event, id) {
                            resourceService.openDeleteModal( resourcesMap[id] );
                        };

                        var updateResourcesView = function () {
                            var resourcesDto = resourceService.getJsTreeMapByWorkflow(resourcesList, $scope.filterType, $scope.searchKeyword, resourceParams);
                            resourcesMap = resourcesDto.resourcesMap;
                            angular.copy(resourcesDto.resources, $scope.resources);
                            $scope.treeConfig.version++;
                        };

                        $scope.reloadTree = function () {
                            resourceService.getResourcesList(resourceParams, function(err, data){
                                if(err){
                                    $log.error(err);
                                    return alert('ERR');//todo
                                }
                                resourcesList = data;
                                updateResourcesView();
                                $scope.treeConfig.version++;
                            });
                        };

                        $scope.reloadTree();

                        $scope.$on('resourceUpdated', function(event, data) {
                            $scope.reloadTree();
                        });

                        var plugins = [ 'types', 'actionmenu', 'conditionalselect' ];
                        if($attrs.checkbox){
                            plugins.push('checkbox');
                        }

                        $scope.treeConfig = {
                            core : {
                                multiple : true,
                                animation: true,
                                error : function(error) {
                                    //$log.error('treeCtrl: error from js tree - ' + angular.toJson(error));
                                },
                                worker : true
                            },
                            'plugins' : plugins,
                            'conditionalselect' : function (node, event) {
                                //return node.type != 'default';
                                return true;
                            },
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

                        $scope.filterFiles = function (type) {
                            $scope.filterType = type;
                            updateResourcesView();
                        };
                        $scope.searchFile = function () {
                            updateResourcesView();
                        };

                        $scope.getSelected = function(){
                            var selectedNodes = $scope.treeInstance.jstree(true).get_selected();
                            var result = [];
                            for(i in selectedNodes){
                                if(resourcesMap[selectedNodes[i]]){
                                    result.push( resourcesMap[selectedNodes[i]].resourceId );
                                }
                            }
                            return result;
                        };

                        $scope.downloadAll = function () {
                            alert('todo');
                        };
                        $scope.readyCB = function() {
                            $log.info('Tree created');
                        };
                        $scope.createNodeCB = function() {
                            $log.info('Create node');
                        };
                        $scope.deleteNodeCB = function() {
                            $log.info('Delete node');
                        };

                    }
                };

            }]);
    });