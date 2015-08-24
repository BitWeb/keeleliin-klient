define(['angularAMD','ProjectService', 'footable'], function (angularAMD) {

angularAMD.controller('ProjectListController', [ '$scope', '$state', '$stateParams', 'ProjectService','$modal',
    function($scope, $state, $stateParams, projectService, $modal) {
        console.log('ProjectController');

        var getList = function (err, data) {
            if(err){
                alert('Err'); //todo
                $scope.projects = [];
                return;
            }

            console.log(data);

            $scope.projects = data.rows;
        };

        projectService.getList({}, getList);


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

    }}]);
});