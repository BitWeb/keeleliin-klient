define([
    'angularAMD',
    'ng-jstree',
    'ProjectService',
    'WorkflowService',
    'ResourceService',
    'footable',
    'filetree'
], function (angularAMD) {

    angularAMD.controller('WorkflowViewController', [ '$scope','$rootScope', '$state', '$stateParams', '$log', 'WorkflowService', '$timeout','ResourceService',
        function($scope, $rootScope, $state, $stateParams, $log, workflowService, $timeout, resourceService ) {

            $scope.workflowId = $stateParams.workflowId;

            var update = function(){
                workflowService.getWorkflow($stateParams.workflowId, function (err, workflow) {
                    if(err){
                        console.log(err);
                        return alert('Err');
                    }
                    $scope.workflow = workflow;
                    findProgress();
                    if(workflow.status == 'RUNNING'){
                        $timeout(update, 2500)
                    }

                    $rootScope.$broadcast('resourceUpdated');
                });
            };
            update();

            function findProgress(){

                if($scope.workflow.status == 'INIT'){
                    $scope.progress = 0;
                    return
                }

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

            $scope.getServiceLogs = function (service) {
                var logs = [];
                service.subSteps.forEach(function (substep) {
                    if(substep.log){
                        logs.push(substep.log);
                    }
                });
                if(service.log){
                    logs.push(service.log);
                }
                return logs;
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

            $scope.openResourceInfoModal = function ( resourceId ) {
                resourceService.openInfoModal( resourceId );
            };

        }]);
});