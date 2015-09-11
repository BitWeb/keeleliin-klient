
define(['angularAMD'], function (angularAMD) {
    angularAMD.controller('WorkflowSettingsModalController',
        [ '$scope', '$state', 'WorkflowService', 'workflowId','$log',
            function ($scope, $state, workflowService, workflowId, $log) {

                $scope.workflow = {
                    name: '',
                    description: '',
                    purpose: ''
                };


                workflowService.getWorkflowSettings(workflowId, function (err, settings) {
                    if(err){
                        $log.error(err);
                        return alert('Err');
                    }

                    console.log(settings);


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
                            alert('Err'); //todo
                            return;
                        }

                        $scope.updateScopeWorkflowSettings(workflow);
                        $scope.$dismiss();
                        $log.debug(workflow);
                    });
                };

            }])
});