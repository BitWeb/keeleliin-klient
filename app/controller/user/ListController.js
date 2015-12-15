define(['angularAMD', 'angular-utils-pagination'], function(angularAMD) {
    angularAMD.controller('UserListController', ['$scope', 'UserService', 'config', '$timeout','$location', function($scope, userService, config, $timeout, $location) {
        var timer;

        $scope.pagination = $location.search();
        if(!$scope.pagination.page){
            $scope.pagination = {
                page: 1,
                name: null,
                role: null,
                perPage: 25
            };
        }

        $scope.roles = config.user.roles;
        $scope.count = 0;
        $scope.users = [];
        $scope.name = '';

        $scope.errorMessage = null;
        $scope.searchUsers = function() {
            $timeout.cancel(timer);
            timer = $timeout(function() {
                getUsers();
            }, 500);
        };

        $scope.enableDisableUser = function(user) {
            user.isActive = !user.isActive;
            userService.updateUser(user, function(err, user) {
                if (err) {
                    $scope.errorMessage = err;
                }
                user.isActive = user.isActive;
            });
        };

        getUsers();
        $scope.changePage = function(page) {
            $scoe.pagination.page = page;
            getUsers()
        };

        function getUsers() {

            userService.getUsersList( $scope.pagination, function(err, data) {
                $location.search( $scope.pagination );
                if (err) {
                    return alert(err);
                }
                $scope.users = data.rows;
                $scope.count = data.count;
            });
        }

    }]);
});