define(['angularAMD','ProjectService', 'footable', 'chosen'], function (angularAMD) {

angularAMD.controller('ProjectListController', [ '$scope', '$state', '$stateParams', 'ProjectService','$modal','UserService',
    function($scope, $state, $stateParams, projectService, $modal, userService) {
        console.log('ProjectListController');

        projectService.getList( function (err, data) {
            if(err){
                alert('Err'); //todo
                $scope.projects = [];
                return;
            }
            console.log(data);
            $scope.projects = data.rows;
        });


        $scope.removeProject = function (project) {

            $scope.confirmProject = project;

            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '../../views/project/confirm-delete.html',
                scope: $scope,
                bindToController: true
            });

            $scope.confirmCancel = function () {
                modalInstance.dismiss('cancel');
            };

            $scope.confirmOk = function () {

                projectService.deleteProject(project, function (err, success) {

                    if(err){
                        console.log(err);
                        alert('Err'); //todo
                        return;
                    }

                    $scope.projects = $scope.projects.filter(function (item) {
                        return item.id != project.id;
                    });
                    //reload footable
                    $('.footable').data('footable').redraw();
                    modalInstance.close();
                });
            }
        };

        $scope.addProject = function(){

            var openModal = function () {
                var modalInstance = $modal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: '../../views/project/add.html',
                    scope: $scope,
                    bindToController: true
                });

                $scope.project = {
                    accessStatus: 'private',
                    name: '',
                    description: ''
                };

                $scope.addCancel = function () {
                    modalInstance.dismiss('cancel');
                };

                $scope.addOk = function (project, projectForm) {
                    projectForm.submitted = true;

                    if(!projectForm.$valid){

                        console.log(project);
                        console.log(projectForm);
                        return;
                    }

                    projectService.addProject($scope.project, function (err, project) {
                        if(err){
                            console.log(err);
                            alert('Err'); //todo
                            return;
                        }
                        modalInstance.dismiss('saved');
                        $state.go('project-item', {id: project.id});
                    });
                };
            };

            userService.getUsersList(function (err, users) {
                $scope.usersList = users;
                openModal();
            });
        }
    }]);
});