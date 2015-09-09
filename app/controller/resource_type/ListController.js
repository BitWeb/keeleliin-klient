define([
    'angularAMD',
    'ResourceTypeService',
    'footable'
], function(angularAMD) {

    angularAMD.controller('ResourceTypeListController', ['$scope', '$stateParams', 'ResourceTypeService',
        function( $scope, $stateParams, resourceTypeService ) {

            resourceTypeService.getResourceTypesList(function (err, data) {
                $scope.resourceTypes = data;
            });
        }]);
});