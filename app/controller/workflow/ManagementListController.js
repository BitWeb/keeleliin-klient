define(['angularAMD', 'angular-utils-pagination', 'WorkflowService'], function(angularAMD) {
    angularAMD.controller('WorkflowManagementListController', ['$scope', 'WorkflowService', 'config', '$timeout', function($scope, workflowService, config, $timeout) {
        var timer;

        $scope.statuses = config.workflow_statuses;

        $scope.totalCount = 0;
        $scope.workflows = [];
        $scope.pagination = {
            page: 1,
            name: '',
            perPage: 25
        };
        $scope.name = '';
        $scope.errorMessage = null;
        $scope.searchWorkflows = function() {
            $timeout.cancel(timer);
            timer = $timeout(function() {
                getWorkflows();
            }, 500);
        };

        getWorkflows();

        $scope.changePage = function(pageNumber) {
            $scope.pagination.page = pageNumber;
            getWorkflows()
        };

        function getWorkflows() {

            workflowService.getWorkflowsManagementList($scope.pagination, function(err, data) {
                if (err) {
                    return alert(err);
                }
                $scope.workflows = data.rows;
                $scope.totalCount = data.count;
            });
        }

        $scope.refreshList = function () {
            getWorkflows();
        };

        $scope.cancelWorkflow = function(workflow) {
            workflowService.cancelWorkflow(workflow.id, function(err, response) {
                if (err) {
                    $scope.errorMessage = err;
                }
                workflow.status = response.status;
                getWorkflows();
            });
        };
    }]);
});