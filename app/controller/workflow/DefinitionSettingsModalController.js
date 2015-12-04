
define(['angularAMD','UserService', 'chosen' ], function (angularAMD) {
    angularAMD.controller('WorkflowDefinitionSettingsModalController',
        [ '$scope', '$state', 'WorkflowDefinitionService', 'definitionId','$log', '$modalInstance','UserService',
            function ($scope, $state, workflowDefinitionService, definitionId, $log, $modalInstance, userService) {

                $scope.definition = {
                    id: null,
                    name: '',
                    description: '',
                    purpose: ''
                };

                userService.getUsersList( {}, function (err, users) {
                    $scope.usersList = users.rows;
                    workflowDefinitionService.getDefinitionSettings(definitionId, function (err, settings) {
                        if(err){
                            $log.error(err);
                            return alert('Err');
                        }
                        $scope.definition = settings;
                    });
                });

                $scope.save = function (form) {

                    console.log('SAVE: ', $scope.definition);


                    form.submitted = true;
                    if(!form.$valid){
                        console.log('Not valid');
                        return;
                    }
                    workflowDefinitionService.updateDefinitionSettings( $scope.definition, function (err, definition) {
                        form.submitted = false;
                        if(err){
                            $log.debug(err);
                            return alert('Err');
                        }

                        $modalInstance.close( definition );
                    });
                };
            }])
});