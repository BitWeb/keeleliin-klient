
define(["angularAMD"], function (angularAMD) {
    angularAMD.controller('ProjectUpdateController',
        [ "$scope", "$modalInstance", "ProjectService", "UserService", "config", "project",
            function ($scope, $modalInstance, projectService, userService, config, project) {

                $scope.selectedUsers = [];

                var updateProject = {
                    name: project.name,
                    description: project.description,
                    accessStatus: project.accessStatus,
                    users: []
                };

                project.projectUsers.forEach(function (item) {
                    if(item.id == project.user.id){
                        return;
                    }
                    $scope.selectedUsers.push(item.id);
                    updateProject.users.push({
                        userId: item.id,
                        role: item.projectUser.role
                    });
                });

                $scope.updateProject = updateProject;

                $scope.usersList = [];
                userService.getUsersList( {}, function (err, users) {
                    $scope.usersList = [];
                    users.rows.forEach(function(item){
                        if(item.id == project.user.id){
                            return;
                        }
                        $scope.usersList.push(item);
                    });
                });

                $scope.saveOk = function (projectForm) {
                    projectForm.submitted = true;
                    if(!projectForm.$valid){
                        return;
                    }
                    projectService.updateProject(project, $scope.updateProject, function (err, updatedProject) {
                        if(err){
                            console.log(err);
                            alert('Err'); //todo
                            return;
                        }

                        console.log('Updated');
                        $modalInstance.close(updatedProject);
                        $scope.$close();
                    });
                };

                $scope.getUserName = function (userId) {
                    for(i in $scope.usersList){
                        var user = $scope.usersList[i];
                        if(user.id == userId){
                            return user.name;
                        }
                    }
                };

                $scope.updateProjectSelectedUsers = function () {
                    for(i in $scope.selectedUsers){
                        var selectedUser = $scope.selectedUsers[i];
                        var userFound = false;
                        for(j in $scope.updateProject.users){
                            if($scope.updateProject.users[j].userId == selectedUser){
                                userFound = true;
                            }
                        }
                        if(!userFound){
                            $scope.updateProject.users.push({
                                userId: selectedUser,
                                role: 'editor'
                            });
                        }
                    }
                    for(i in $scope.updateProject.users){
                        if($scope.selectedUsers.indexOf($scope.updateProject.users[i].userId) == -1){
                            $scope.updateProject.users.splice(i,1);
                        }
                    }
                };

                $scope.roles = config.project.userRoles;
            }]);
});