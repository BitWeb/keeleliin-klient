
define(["angularAMD"], function (angularAMD) {
    angularAMD.controller('AddDefinitionModalController',
        [ "$scope", "$state", "", "project",
            function ($scope, $state, project) {

                $scope.save = function (project, addForm) {
                    addForm.submitted = true;

                    if(!addForm.$valid){
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

                userService.getUsersList(function (err, users) {
                    $scope.usersList = users;
                });
            }])
});