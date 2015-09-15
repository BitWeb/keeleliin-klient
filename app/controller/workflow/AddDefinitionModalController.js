
define(['angularAMD', 'UserService'], function (angularAMD) {

    angularAMD.controller('AddDefinitionModalController',
        [ '$scope', '$state', 'WorkflowDefinitionService', 'project','$log','UserService',
            function ($scope, $state, workflowDefinitionService, project, $log, userService) {

                $scope.definition = {
                    projectId: project.id,
                    name: '',
                    description: '',
                    purpose: '',
                    accessStatus: 'private'
                };

                userService.getUsersList( {}, function (err, users) {
                    $scope.usersList = users.rows;
                });

                $scope.save = function (form) {
                    form.submitted = true;

                    if(!form.$valid){
                        return;
                    }

                    workflowDefinitionService.defineNewWorkflow( $scope.definition, function (err, workflow) {
                        if(err){
                            console.log(err);
                            alert('Err'); //todo
                            return;
                        }
                        $scope.$dismiss();

                        $log.debug(workflow);

                        $state.go('workflow-definition-edit', {workflowId: workflow.id});
                    });
                };


            }])
});