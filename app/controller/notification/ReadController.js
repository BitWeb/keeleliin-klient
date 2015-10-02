define(['angularAMD', 'NotificationService'], function(angularAMD) {
    angularAMD.controller('NotificationReadController', ['$scope', '$rootScope', '$stateParams', 'NotificationService', function($scope, $rootScope, $stateParams, notificationService ) {

            notificationService.markNotificationAsRead($stateParams.notificationId, function (err, data) {
                if(err){
                    alert(err);
                }
                $rootScope.userService.doHeardBeat();
                window.location.href = data.url;
            });
    }]);
});