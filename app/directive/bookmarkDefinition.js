define([
        'angularAMD',
        'WorkflowDefinitionService'
    ],
    function (angularAMD) {

        angularAMD.directive('bookmarkDefinition', [ '$log','WorkflowDefinitionService',
            function( $log, definitionService) {

                return {
                    scope: {
                        definitionId: '=',
                        isBookmarked: '=',
                        updateCb: '='
                    },
                    restrict: 'AEC',
                    transclude: false,
                    template: '<button ng-click="toggleStatus()" class="btn btn-circle {{btnClass}}" type="button" title="Lemmik töövoo kirjeldus"><i class="fa fa-star"></i></button>',
                    link: function( $scope, $element, $attrs ){

                        if(!$scope.definitionId){
                            console.error('No definitionId');
                            return;
                        }

                        var updateBookmark = function (isBookmarked) {
                            $scope.isBookmarked = isBookmarked;
                            $scope.btnClass = $scope.isBookmarked ? 'btn-warning' : '';
                        };
                        updateBookmark($scope.isBookmarked);
                        $scope.toggleStatus = function () {
                            updateBookmark(!$scope.isBookmarked);
                            definitionService.toggleDefinitionBookmark($scope.definitionId, function (err, response) {
                                updateBookmark( response.isBookmarked );
                                if($scope.updateCb){
                                    $scope.updateCb($scope.definitionId, response.isBookmarked);
                                }
                            });
                        };
                    }
                };
            }]);
    });