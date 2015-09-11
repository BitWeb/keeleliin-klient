
define(['angularAMD'], function (angularAMD) {
    angularAMD.controller('WorkflowSettingsModalController',
        [ '$scope', '$state', 'WorkflowService', 'workflowId','$log', '$modalInstance',
            function ($scope, $state, workflowService, workflowId, $log, $modalInstance) {

                $scope.workflow = {
                    id: null,
                    name: '',
                    description: '',
                    purpose: ''
                };
                workflowService.getWorkflowSettings(workflowId, function (err, settings) {
                    if(err){
                        $log.error(err);
                        return alert('Err');
                    }
                    $scope.workflow = settings;
                });

                $scope.save = function (form) {
                    form.submitted = true;
                    if(!form.$valid){
                        return;
                    }
                    workflowService.updateWorkflowSettings( $scope.workflow, function (err, workflow) {
                        if(err){
                            console.log(err);
                            return alert('Err');
                        }

                        $modalInstance.close(workflow);
                    });
                };
            }])
});