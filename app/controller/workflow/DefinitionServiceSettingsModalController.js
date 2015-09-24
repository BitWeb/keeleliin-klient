
define(['angularAMD' ], function (angularAMD) {
    angularAMD.controller('WorkflowDefinitionServiceSettingsModalController',
        [ '$scope', '$state', '$log', '$modalInstance', 'selectedService', 'service',
            function ($scope, $state, $log, $modalInstance, selectedService, service) {
                $scope.service = service;
                $scope.serviceParamsValues = selectedService.serviceParamsValues;
                $scope.save = function () {
                    $modalInstance.close( selectedService );
                };
            }])
});