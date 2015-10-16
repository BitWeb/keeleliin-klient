define([
        'angularAMD',
        'EntuService'
    ],
    function (angularAMD) {

        angularAMD.directive('entutree', [ '$log','$rootScope', '$compile', 'EntuService',
            function( $log, $rootScope, $compile, entuService) {

                return {
                    scope: {
                        getSelected: '='
                    },
                    restrict: 'A',
                    transclude: true,
                    templateUrl: 'views/resource/filetree.html',
                    link: function( $scope, $element, $attrs ){
                        console.log("jsFileTreeDir");
                        $scope.resources = [];
                        var resourcesMap = {};
                        var resourcesList = {};

                        $scope.hideTabs = true;

                        var updateResourcesView = function () {
                            angular.copy(entuService.getJsTreeMap(resourcesList), $scope.resources);
                            $scope.treeConfig.version++;
                        };

                        $scope.reloadTree = function () {
                            entuService.getResourcesList({}, function(err, data){
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



                        var plugins = [ 'types', /*'actionmenu',*/ 'conditionalselect' ];
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
                                var node = selectedNodes[i];
                                var nodeparts = node.split('-');
                                if(nodeparts[0] == 'file'){
                                    result.push(nodeparts[1]);
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