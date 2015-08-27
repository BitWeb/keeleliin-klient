
define([
    "angularAMD",
    "WorkflowDefinitionService"
], function (angularAMD) {
    angularAMD.controller('WorkflowDefinitionEditController',
        [ "$scope", "$state", "$stateParams", "WorkflowDefinitionService",
            function ($scope, $state, $stateParams, workflowDefinitionService) {

                    $scope.id = $stateParams.id;


            }])
});