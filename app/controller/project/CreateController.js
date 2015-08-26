/**
 * Created by priit on 26.08.15.
 */

define(["angularAMD"], function (angularAMD) {
    angularAMD.controller('ProjectCreateController',
    [ "$scope", "$state", "ProjectService", "UserService",
    function ($scope, $state, projectService, userService) {

        $scope.project = {
            accessStatus: 'private',
            name: '',
            description: ''
        };

        $scope.usersList = [];

        $scope.addCancel = function () {
            console.log($scope);
            //modalInstance.dismiss('cancel');
        };

        $scope.addOk = function (project, projectForm) {
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

        userService.getUsersList(function (err, users) {
            $scope.usersList = users;
        });
    }])
});