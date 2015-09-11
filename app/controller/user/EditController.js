define(['angularAMD'], function(angularAMD) {
    angularAMD.controller('UserEditController', ['$scope', '$stateParams', 'UserService', 'config', function($scope, $stateParams, userService, config) {
        $scope.userId = $stateParams.userId;
        $scope.message = null;
        $scope.user = null;
        $scope.roles = config.user.roles;
        $scope.master = {};
        $scope.update = function(user, form) {
            $scope.master = angular.copy(user);
            userService.updateUser($scope.master, function(err, user) {
                if (err) {
                    console.log(err);
                    return alert(err);
                }
                if (form) {
                    form.$setPristine();
                    form.$setUntouched();
                }
                $scope.message = 'Kasutaja info on uuendatud.';
            });
        };

        $scope.reset = function(form) {
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }
            $scope.user = angular.copy($scope.master);
        };

        userService.getUser($stateParams.userId, function(err, user) {
            if (err) {
                console.log(err);
                return alert(err);
            }
            $scope.master = angular.copy(user);
            $scope.user = user;
        });
    }]);
});