define([
    'angularAMD',
    'StatisticsService'
], function(angularAMD) {

    angularAMD.controller('StatisticsIndexController', ['$scope', '$timeout', 'StatisticsService', function($scope, $timeout, statisticsService) {




        $scope.refreshStatistics = function () {
            statisticsService.getServerStatistics(function (err, data) {
                $scope.statistics = data;
            });
        };

        $scope.refreshStatistics();


    }]);
});