define(['angularAMD'], function (angularAMD) {

    angularAMD.service('StatisticsService', [ '$http', 'config',
        function( $http, config ) {
            var self = this;

            this.getServerStatistics = function (callback) {

                $http.get(config.API_URL + '/statistics', {params: {}}).then(function (response) {
                    callback(null, response.data.data);
                });
            };

            this.getServiceStatistics = function ( serviceId, callback ) {
                $http.get(config.API_URL + '/service/'+ serviceId +'/statistics', {params: {}}).then(function (response) {
                    callback(null, response.data.data);
                });
            };

        }
    ]);
});