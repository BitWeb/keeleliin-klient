define(['angularAMD', 'angular-utils-pagination', 'NotificationService'], function(angularAMD) {
    angularAMD.controller('NotificationListController', ['$scope', 'NotificationService', function($scope, notificationService ) {
        var timer;

        $scope.totalCount = 0;
        $scope.notifications = [];
        $scope.pagination = {
            page: 1,
            perPage: 25
        };

        getNotifications();

        $scope.changePage = function(pageNumber) {
            $scope.pagination.page = pageNumber;
            getNotifications()
        };

        function getNotifications() {

            notificationService.getNotificationsList($scope.pagination, function(err, data) {
                if (err) {
                    return alert(err);
                }
                $scope.notifications = data.rows;
                $scope.totalCount = data.count;
            });
        }

        $scope.markAsRead = function ( notification ) {

            notification.isRead = true;
            notificationService.markNotificationAsRead(notification.id, function (err, data) {
                if(err){
                    alert(err);
                }
            });


        }
    }]);
});