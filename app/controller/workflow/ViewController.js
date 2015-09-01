define([
    'angularAMD',
    'ng-jstree',
    'ProjectService',
    'WorkflowService',
    'footable',
    'ResourceTreeController'
], function (angularAMD) {

    angularAMD.controller('WorkflowViewController', [ '$scope', '$state', '$stateParams', '$log', 'WorkflowService', '$timeout',
        function($scope, $state, $stateParams, $log, workflowService, $timeout ) {

            $scope.workflowId = $stateParams.id;

            var update = function(){
                workflowService.getWorkflow($stateParams.id, function (err, workflow) {
                    if(err){
                        console.log(err);
                        return alert('Err');
                    }
                    $scope.workflow = workflow;
                    findProgress();
                    if(workflow.status == 'RUNNING'){
                        $timeout(update, 2500)
                    }
                });
            };
            update();

            function findProgress(){

                var progress = 100;
                if($scope.workflow.workflowServices.length > 0){
                    progress = Math.round(($scope.workflow.workflowServices.filter(function(value){return value.status == 'FINISHED';}).length * 100) / $scope.workflow.workflowServices.length);
                }

                $scope.progress = progress;
            }

            $scope.getServiceInputResources = function ( service ) {
                var resources = [];
                service.subSteps.forEach(function (substep) {
                    substep.inputResources.forEach(function (resource) {
                        resources.push(resource);
                    });
                });
                console.log('Input', resources);
                return resources;
            };

            $scope.getServiceOutputResources = function ( service ) {
                var resources = [];
                service.subSteps.forEach(function (substep) {
                    substep.outputResources.forEach(function (resource) {
                        resources.push(resource);
                    });
                });
                console.log('Output: ',resources);
                return resources;
            };

            $scope.cancelWorkflow = function () {
                workflowService.cancelWorkflow($scope.workflow.id, function (err, workflow) {

                    console.log(workflow);
                    console.log(err);

                    if (err) {
                        console.log(err);
                        return alert('Err');
                    }
                    $scope.workflow = workflow;
                    findProgress();
                    $timeout(update, 4000)
                });
            };

            $scope.openWorkflowPropertiesModal = function(){
                alert('Todo');
            };






        }]);
});