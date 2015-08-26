/**
 * Created by priit on 26.08.15.
 */

define(["angularAMD"], function (angularAMD) {
    angularAMD.controller('ProjectDeleteController',
        [ "$scope", "$state", "ProjectService","project",
            function ( $scope, $state, projectService, project ) {

                $scope.project = project;
                $scope.confirmOk = function () {
                    projectService.deleteProject(project, function (err, success) {
                        if(err){
                            console.log(err);
                            alert('Err'); //todo
                            return;
                        }

                        console.log( $scope.projects );

                        var projects = $scope.projects.filter(function (item) {
                            return item.id != project.id;
                        });

                        $scope.setProjects(projects);

                        //reload footable
                        $('.footable').data('footable').redraw();
                        $scope.$close();
                    });
                }
            }])
})