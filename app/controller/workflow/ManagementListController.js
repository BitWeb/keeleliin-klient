define(['angularAMD', 'angular-utils-pagination', 'WorkflowService', 'WorkflowDefinitionService'], function(angularAMD) {
    angularAMD.controller('WorkflowManagementListController', ['$scope', 'WorkflowService','WorkflowDefinitionService', 'config', '$timeout', function($scope, workflowService, workflowDefinitionService, config, $timeout) {
        var timer;

        $scope.statuses = config.workflow_statuses;

        $scope.totalCount = 0;
        $scope.workflows = [];

        $scope.workflowOrderByOptions = ['name_asc','name_desc','created_at_asc','created_at_desc'];


        $scope.pagination = {
            page: 1,
            name: '',
            perPage: 25
        };
        $scope.errorMessage = null;

        function getWorkflows() {
            workflowService.getWorkflowsManagementList($scope.pagination, function(err, data) {
                if (err) {
                    return alert(err);
                }
                $scope.workflows = data.rows;
                $scope.totalCount = data.count;
            });
        }

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

/////

        $scope.definitionOrderByOptions = ['name_asc','name_desc','created_at_asc','created_at_desc', 'used_asc', 'used_desc', 'bookmarked_asc', 'bookmarked_desc'];
        $scope.accessStatuses = ['private','public','shared'];
        $scope.definitionsTotalCount = 0;
        $scope.definitions = [];
        $scope.definitionPagination = {
            page: 1,
            name: '',
            perPage: 25,
            accessStatus: '',
            order: ''
        };

        function getDefinitions() {
            workflowDefinitionService.getWorkflowDefinitionsManagementList($scope.definitionPagination, function(err, data) {
                if (err) {
                    return alert(err);
                }
                $scope.definitions = data.rows;
                $scope.definitionsTotalCount = data.count;
            });
        }

        $scope.searchDefinitions = function() {
            getDefinitions();
        };
        getDefinitions();

        $scope.changeDefinitionsPage = function(pageNumber) {
            $scope.definitionPagination.page = pageNumber;
            getDefinitions()
        };

    }]);
});