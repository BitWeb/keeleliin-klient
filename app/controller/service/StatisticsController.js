define([
    'angularAMD',
    'StatisticsService'
], function(angularAMD) {

    angularAMD.controller('ServiceStatisticsController', ['$scope', '$timeout', 'StatisticsService','$stateParams', function($scope, $timeout, statisticsService, $stateParams) {

        $scope.refreshStatistics = function () {
            statisticsService.getServiceStatistics($stateParams.serviceId, function (err, data) {
                $scope.statistics = data;
            });
        };

        $scope.refreshStatistics();

    }]);
});