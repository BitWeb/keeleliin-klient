/**
 * Created by priit on 26.08.15.
 */

define(["angularAMD"], function (angularAMD) {
    angularAMD.controller('ProjectCreateController',
    [ "$scope", "$state", "ProjectService", "UserService", "config",
    function ($scope, $state, projectService, userService, config) {

        $scope.project = {
            accessStatus: 'private',
            name: '',
            description: '',
            users: []
        };

        $scope.usersList = [];

        $scope.saveOk = function (project, projectForm) {
            projectForm.submitted = true;

            if(!projectForm.$valid){
                return;
            }

            projectService.addProject($scope.project, function (err, project) {
                if(err){
                    console.log(err);
                    alert('Err'); //todo
                    return;
                }
                $scope.$close();
                $state.go('project-item', {id: project.id});
            });
        };

        userService.getUsersList( {}, function (err, users) {
            $scope.usersList = users.rows;
        });

        $scope.getUserName = function (userId) {

            for(i in $scope.usersList){
                var user = $scope.usersList[i];
                if(user.id == userId){
                    return user.name;
                }
            }
        };

        $scope.selectedUsers = [];
        $scope.updateProjectSelectedUsers = function () {
            for(i in $scope.selectedUsers){
                var selectedUser = $scope.selectedUsers[i];
                var userFound = false;
                for(j in $scope.project.users){
                    var user = $scope.project.users[j];
                    if(user.userId == selectedUser){
                        userFound = true;
                    }
                }
                if(!userFound){
                    $scope.project.users.push({
                        userId: selectedUser,
                        role: 'editor'
                    });
                }
            }
            for(i in $scope.project.users){
                var user = $scope.project.users[i];
                if($scope.selectedUsers.indexOf(user.userId) == -1){
                    $scope.project.users.splice(i,1);
                }
            }
        };

        $scope.roles = config.project.userRoles;

    }]);
});