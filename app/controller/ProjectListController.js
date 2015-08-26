define(['angularAMD','ProjectService', 'footable', 'chosen', 'controller/project/CreateController', 'controller/project/DeleteController'], function (angularAMD) {

angularAMD.controller('ProjectListController', [ '$scope', '$state', '$stateParams', 'ProjectService','UserService',
    function($scope, $state, $stateParams, projectService, userService) {
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



        $scope.openCreateModal = function () {
            projectService.openCreateModal($scope);
        };

        $scope.openRemoveProject = function (project) {
            projectService.openDeleteModal($scope, project);
        };

        $scope.setProjects = function(projects){
            $scope.projects = projects;
        };
    }]);
});