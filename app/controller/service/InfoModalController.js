define([
    'angularAMD',
    'ServiceService'
], function (angularAMD) {

    angularAMD.controller('ServiceInfoModalController', [ '$scope', 'ServiceService','serviceId',
        function($scope, serviceService, serviceId) {
            serviceService.getService(serviceId, function (err, service) {
                $scope.service = service;
            });
        }]);
});