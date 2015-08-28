
define(['angularAMD','ResourceService'], function (angularAMD) {
    angularAMD.controller('ResourceTreeController',
        [ "$scope","$log", "ResourceService",
            function ($scope, $log, resourceService) {

                $scope.resources = [];
                var resourcesMap = {};
                var resourcesList = {};

                var resourceParams = {
                    projectId: $scope.projectId
                };


                $scope.fileDownloadAction = function (event, id) {
                    resourceService.downloadResourceById( resourcesMap[id] );
                };

                $scope.fileInfoAction = function (event, id) {
                    //resourcesMap[id]
                    alert('todo');
                };

                $scope.fileDeleteAction = function (event, id) {
                    //resourcesMap[id]
                    alert('todo');
                };



                var updateResources = function () {
                    var resourcesDto = resourceService.getJsTreeMapByWorkflow(resourcesList, $scope.filterType, $scope.searchKeyword);
                    resourcesMap = resourcesDto.resourcesMap;

                    console.log(resourcesDto.resources);

                    angular.copy(resourcesDto.resources, $scope.resources);
                    $scope.treeConfig.version++;
                };



                resourceService.getResourcesList(resourceParams, function(err, data){
                    if(err){
                        $log.error(err);
                        return alert('ERR');//todo
                    }
                    resourcesList = data;
                    updateResources();
                    $scope.treeConfig.version++;
                });

                $scope.treeConfig = {
                    core : {
                        multiple : true,
                        animation: true,
                        error : function(error) {
                            $log.error('treeCtrl: error from js tree - ' + angular.toJson(error));
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
                    updateResources();
                };

                $scope.readyCB = function() {
                    $log.info('Tree created');
                };

                $scope.searchFile = function () {
                    updateResources();
                };

                $scope.downloadAll = function () {

                    $log.debug($scope.treeInstance);


                    var selected_nodes = $scope.treeInstance.jstree(true).get_selected();
                    $log.log(selected_nodes);
                    alert('todo');
                };
            }])
});