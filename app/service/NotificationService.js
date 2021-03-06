define(['angularAMD'], function (angularAMD) {

    angularAMD.service('NotificationService', [ '$http', 'config', '$modal',
        function( $http, config, $modal ) {
            var self = this;

            this.getNotificationsList = function (pagination, callback) {
                pagination = pagination  || {};

                $http.get(config.API_URL + '/notification/list', {params: pagination}).then(function (response) {
                    callback(null, response.data.data);
                });
            };

            this.markNotificationAsRead = function (notificationId, callback) {
                $http.put(config.API_URL + '/notification/read', {notificationId: notificationId}).then(
                    function (data) {
                        callback(null, data.data.data);
                    }
                );
            };

            this.markAllNotificationAsRead = function (callback) {
                $http.put( config.API_URL + '/notification/read-all' ).then(
                    function (data) {
                        callback(null, data.data.data);
                    }
                );
            };

            this.deleteNotification = function (notificationId, callback) {
                $http.delete( config.API_URL + '/notification/' + notificationId ).then(
                    function (data) {
                        callback(null);
                    }
                );
            };
        }
    ]);
});