
define(["angularAMD"], function (angularAMD) {
    angularAMD.controller('AddDefinitionModalController',
        [ "$scope", "$state", "WorkflowDefinitionService", "project",
            function ($scope, $state, workflowDefinitionService, project) {

                $scope.definition = {
                    name: '',
                    description: '',
                    purpose: ''
                };

                $scope.save = function (form) {
                    form.submitted = true;

                    if(!form.$valid){
                        return;
                    }

                    workflowDefinitionService.addDefinition($scope.definition, project, function (err, definition) {
                        if(err){
                            console.log(err);
                            alert('Err'); //todo
                            return;
                        }
                        $scope.$dismiss();
                        $state.go('workflow-definition-edit', {id: definition.id});
                    });
                };


            }])
});