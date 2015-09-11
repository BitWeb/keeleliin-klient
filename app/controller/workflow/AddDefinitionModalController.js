
define(['angularAMD'], function (angularAMD) {
    angularAMD.controller('AddDefinitionModalController',
        [ '$scope', '$state', 'WorkflowDefinitionService', 'project','$log',
            function ($scope, $state, workflowDefinitionService, project, $log) {

                $scope.definition = {
                    projectId: project.id,
                    name: '',
                    description: '',
                    purpose: ''
                };

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