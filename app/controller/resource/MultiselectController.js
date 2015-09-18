/**
 * Created by priit on 18.09.15.
 */

define([
    'angularAMD',
    'ResourceService'
], function (angularAMD) {

    angularAMD.controller('ResourceMultiselectController', [ '$scope', '$rootScope', '$log', '$modalInstance',
        function($scope, $rootScope, $log, $modalInstance ) {

            $scope.addResources = function () {
                var selectedFiles = $scope.getSelectedFiles();
                $modalInstance.close( selectedFiles );
            }
        }]);
});