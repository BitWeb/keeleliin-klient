define(['angularAMD','ProjectService', 'footable'], function (angularAMD) {

    angularAMD.controller('ProjectController', [ '$scope', '$state', '$stateParams', 'ProjectService','$modal',
        function($scope, $state, $stateParams, projectService, $modal) {
            console.log('ProjectController');

            var projectId = $stateParams.id;

            projectService.getProject(projectId, function (err, project) {
                if(err){
                   console.log(err);
                   return alert('Err');
                }
                $scope.project = project;
            });

            projectService.getProjectWorkflows(projectId, function (err, workflows) {
                if(err){
                    console.log(err);
                    return alert('Err');
                }
                $scope.workflows = workflows;
            });






            $scope.defineWorkflow = function () {





            };
        }]);
});