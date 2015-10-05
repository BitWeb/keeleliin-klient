define(['angularAMD', 'angular-utils-pagination'], function(angularAMD) {
    angularAMD.controller('UserListController', ['$scope', 'UserService', 'config', '$timeout', function($scope, userService, config, $timeout) {
        var timer;

        $scope.roles = config.user.roles;
        $scope.count = 0;
        $scope.perPage = 25;
        $scope.users = [];
        $scope.pagination = {
            current: 1
        };
        $scope.name = '';
        $scope.role = '';
        $scope.errorMessage = null;
        $scope.searchUsers = function() {
            $timeout.cancel(timer);
            timer = $timeout(function() {
                $scope.pagination = {
                    current: 1
                };
                getUsers($scope.pagination.current);
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
            getUsers(page)
        };

        function getUsers(page, inputPagination) {
            var pagination = inputPagination || {
                page: page,
                name: $scope.name,
                role: $scope.role,
                perPage: $scope.perPage
            };
            userService.getUsersList(pagination, function(err, data) {
                if (err) {

                    return alert(err);
                }
                $scope.users = data.rows;
                $scope.count = data.count;
            });
        }

    }]);
});