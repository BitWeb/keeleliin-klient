define([
    'angularAMD',
    'ServiceService',
    'footable'
    ], function(angularAMD) {

    angularAMD.controller('ServiceListController', ['$scope', '$stateParams', 'ServiceService',
        function( $scope, $stateParams, serviceService ) {

            serviceService.getServicesList(function (err, data) {
                $scope.services = data;
            });

            $scope.toggleStatus = function (service) {
                serviceService.toggleServiceStatus(service, function (err, updatedService) {
                    service.isActive = updatedService.isActive;
                });
            }

    }]);
});