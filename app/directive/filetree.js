define([
        'angularAMD',
        'ResourceService'
    ],
    function (angularAMD) {

        angularAMD.directive('filetree', [ '$log','$rootScope', '$compile', 'ResourceService',
            function( $log, $rootScope, $compile, resourceService) {

                return {
                    restrict: 'A',
                    //require: 'ng-jstree',
                    transclude: true,
                    templateUrl: 'views/resource/filetree.html',
                    //replace:true,
                   // link: function($scope, element, $attrs) {},
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
                            resourceService.downloadResourceById( resourcesMap[id] );
                        };

                        $scope.fileInfoAction = function (event, id) {
                            resourceService.openInfoModal( resourcesMap[id] );
                        };

                        $scope.fileDeleteAction = function (event, id) {
                            resourceService.openDeleteModal( resourcesMap[id] );
                        };

                        var updateResourcesView = function () {
                            var resourcesDto = resourceService.getJsTreeMapByWorkflow(resourcesList, $scope.filterType, $scope.searchKeyword);
                            resourcesMap = resourcesDto.resourcesMap;
                            angular.copy(resourcesDto.resources, $scope.resources);
                            $scope.treeConfig.version++;
                        };

                        $scope.reloadResourcesTreeList = function () {
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

                        $scope.reloadResourcesTreeList();

                        $rootScope.$on('resourceUpdated', function(event, data) {
                            $scope.reloadResourcesTreeList();
                        });

                        $scope.treeConfig = {
                            core : {
                                multiple : true,
                                animation: true,
                                error : function(error) {
                                    //$log.error('treeCtrl: error from js tree - ' + angular.toJson(error));
                                },
                                worker : true
                            },
                            'plugins' : [ 'types', 'actionmenu', 'conditionalselect' ],
                            'conditionalselect' : function (node, event) {
                                if(node.type == 'default'){
                                    return false;
                                }
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
                        $scope.downloadAll = function () {
                            $log.debug($scope.treeInstance);
                            var selected_nodes = $scope.treeInstance.jstree(true).get_selected();
                            $log.log(selected_nodes);
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