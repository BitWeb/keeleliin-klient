define([
        'angularAMD',
        'EntuService'
    ],
    function (angularAMD) {

        angularAMD.directive('entutree', [ '$log','$rootScope', '$compile', 'EntuService', '$timeout',
            function( $log, $rootScope, $compile, entuService, $timeout) {

                return {
                    scope: {
                        getSelected: '='
                    },
                    restrict: 'A',
                    transclude: true,
                    templateUrl: 'views/resource/entutree.html',
                    link: function( $scope, $element, $attrs ){

                        $scope.searchKeyword = '';

                        var reloadTimeout = null;

                        $scope.reloadTree = function () {
                            if( reloadTimeout !== null ){
                                $timeout.cancel( reloadTimeout );
                            }
                            reloadTimeout = $timeout(function () {
                                $scope.treeConfig.version++;
                            }, 400);
                        };

                        var plugins = [ 'types', 'checkbox', 'conditionalselect' ];

                        $scope.treeConfig = {
                            core : {
                                multiple : true,
                                animation: true,
                                error : function(error) {
                                    //$log.error('treeCtrl: error from js tree - ' + angular.toJson(error));
                                },
                                worker : true,
                                'data' : function (node, cb) {
                                    console.log('GET NODE ', node);

                                    var params = {
                                        query: $scope.searchKeyword
                                    };

                                    entuService.getEntuNodeChildren(node, params, function (err, children) {
                                        cb( children );
                                    });
                                }
                            },
                            'plugins' : plugins,
                            'conditionalselect' : function (node, event) {
                                if(node.data && node.data.scope != 'file'){
                                    if(node.state.opened == true && node.children && node.children.length > 0 && node.id != 'root'){
                                        return true;
                                    }
                                    event.preventDefault();
                                    event.stopPropagation();
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

                        $scope.getSelected = function(){
                            var selectedNodes = $scope.treeInstance.jstree(true).get_selected();

                            console.log('SelectedNodes: ', selectedNodes);

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