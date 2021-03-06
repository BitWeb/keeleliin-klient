define([
    'angularAMD',
    'ng-jstree',
    'ProjectService',
    'WorkflowService',
    'ResourceService',
    'footable',
    'filetree',
    'WorkflowSettingsModalController',
    'ConfirmModalController'
], function (angularAMD) {

    angularAMD.controller('WorkflowViewController', [ '$scope','$rootScope', '$state', '$stateParams', '$log', 'WorkflowService', '$timeout','ResourceService',
        function($scope, $rootScope, $state, $stateParams, $log, workflowService, $timeout, resourceService ) {

            var initStateName = $state.current.name;
            $scope.projectId = $stateParams.projectId;
            $scope.workflowId = $stateParams.workflowId;

            var update = function(){
                if( initStateName != $state.current.name ){
                    return;
                }

                workflowService.getWorkflow($stateParams.workflowId, function (err, workflow) {
                    if(err){
                        console.error(err);
                        return alert('Err');
                    }

                    updateScope( workflow );
                    if(workflow.status == 'RUNNING'){
                        $timeout(function () {
                            update();
                        }, 2500)
                    }
                });
            };
            update();

            function updateScope( workflow ){

                var serviceProgress = 100;
                var updateProgress = 0;

                if(workflow.status == 'INIT'){
                    serviceProgress = 0;
                } else {
                    if( workflow.workflowServices && workflow.workflowServices.length > 0){
                        serviceProgress = Math.round(( workflow.workflowServices.filter(function(value){return value.status == 'FINISHED';}).length * 100) / workflow.workflowServices.length);
                        for(i in workflow.workflowServices){
                            for(j in workflow.workflowServices[i].subSteps){
                                updateProgress += workflow.workflowServices[i].subSteps[j].status.length;
                            }
                        }
                    }
                }

                if(!$scope.workflow){
                    $scope.workflow = workflow;
                    $scope.progress = serviceProgress;
                    $scope.updateTopErrors();
                    return;
                }

                if($scope.progress != serviceProgress || $scope.updateProgress != updateProgress){
                    $scope.updateProgress = updateProgress;
                    $scope.workflow = workflow;
                    $scope.progress = serviceProgress;
                    $scope.updateTopErrors();
                    $scope.$broadcast('resourceUpdated');
                }
            } //reloadSelectedTree

            $scope.getServiceInputResources = function ( service ) {
                var resources = [];
                service.subSteps.forEach(function (substep) {
                    substep.inputResources.forEach(function (resource) {
                        resources.push(resource);
                    });
                });
                return resources;
            };

            $scope.getServiceOutputResources = function ( service ) {
                var resources = [];
                service.subSteps.forEach(function (substep) {
                    substep.outputResources.forEach(function (resource) {
                        resources.push(resource);
                    });
                });
                return resources;
            };

            $scope.getServiceLogs = function (service) {
                var logs = [];
                service.subSteps.forEach(function (substep) {
                    if(substep.errorLog){
                        logs.push(substep.errorLog);
                    }
                });
                if(service.log){
                    logs.push(service.log);
                }
                return logs;
            };

            $scope.updateTopErrors = function () {
                var result = [];
                for(i in $scope.workflow.workflowServices){
                    var workflowService = $scope.workflow.workflowServices[i];
                    if(workflowService.status == 'ERROR'){
                        result.push('Teenuses ' + workflowService.service.name + ' tekkis viga.');
                        var serviceLogs = $scope.getServiceLogs( workflowService );
                        result = result.concat( serviceLogs );
                    }
                }
                $scope.topErrors = result;
            };

            $scope.cancelWorkflow = function () {
                workflowService.cancelWorkflow($scope.workflow.id, function (err, workflow) {
                    if (err) {
                        console.error(err);
                        return alert('Err');
                    }
                    $scope.workflow = workflow;
                    updateScope(workflow);
                    $timeout(function () {
                        update();
                        $scope.$broadcast('resourceUpdated');
                    }, 4000)
                });
            };

            $scope.openWorkflowSettingsModal = function(){
                workflowService.openWorkflowSettingsModal($scope, $scope.workflow, function (err, workflow) {
                    $scope.workflow = workflow;
                });
            };

            $scope.openResourceInfoModal = function ( resourceId ) {
                resourceService.openInfoModal( resourceId );
            };
            $scope.downloadResource = function ( resourceId ) {
                resourceService.downloadResourceById( resourceId );
            };

            $scope.deleteWorkflow = function () {
                workflowService.deleteWorkflow($scope.workflow.id, function (err, success) {
                    if(!err && success){
                        $state.go('project-item', {projectId: $scope.workflow.projectId});
                    }
                });
            };

            $scope.copyWorkflow = function(){
                workflowService.getWorkflowFromWorkflow($scope.workflow.id, function (err, workflow) {
                    if(!err){
                        $state.go('workflow-resource-upload', {workflowId: workflow.id});
                    }
                });
            };

            $scope.downloadLog = function(){
                workflowService.downloadLog( $scope.workflow.id );
            };

        }]);
});