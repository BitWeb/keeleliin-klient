define(['angularAMD', 'angular-utils-pagination', 'WorkflowService', 'WorkflowDefinitionService'], function(angularAMD) {
    angularAMD.controller('WorkflowManagementListController', ['$scope', 'WorkflowService','WorkflowDefinitionService', 'config', '$timeout','$location', function($scope, workflowService, workflowDefinitionService, config, $timeout, $location) {
        var timer;

        $scope.pagination = $location.search();
        if($scope.pagination.tab == undefined){

            $scope.pagination = {
                definitionPage: 1,
                definitionName: null,
                definitionAccessStatus: null,
                definitionPerPage: 25,
                definitionOrder: null,

                workflowPage: 1,
                workflowName: null,
                workflowStatus: null,
                workflowPerPage: 25,
                workflowOrder: null,

                tab: 'workflows'
            };
        }

        $scope.loadtab = function (tab) {
            console.log(tab);
            $scope.pagination.tab = tab;

            if($scope.pagination.tab == 'definitions'){
                getDefinitions();
            } else if($scope.pagination.tab == 'workflows') {
                getWorkflows();
            } else {
                alert('Tab not defined! ' + $scope.pagination.tab);
            }
        };
        $scope.loadtab($scope.pagination.tab);


        $scope.statuses = config.workflow_statuses;
        $scope.totalCount = 0;
        $scope.workflows = [];
        $scope.workflowOrderByOptions = ['name_asc','name_desc','created_at_asc','created_at_desc'];
        $scope.errorMessage = null;

        function getWorkflows() {

            var params = {
                page: $scope.pagination.workflowPage,
                name: $scope.pagination.workflowName,
                status: $scope.pagination.workflowStatus,
                perPage: $scope.pagination.workflowPerPage,
                order: $scope.pagination.workflowOrder
            };

            workflowService.getWorkflowsManagementList( params, function(err, data) {
                $location.search( $scope.pagination );
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

        $scope.changePage = function(pageNumber) {
            $scope.pagination.workflowPage = pageNumber;
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

        function getDefinitions() {
            var params = {
                page: $scope.pagination.definitionPage,
                name: $scope.pagination.definitionName,
                accessStatus: $scope.pagination.definitionAccessStatus,
                perPage: $scope.pagination.definitionPerPage,
                order: $scope.pagination.definitionOrder
            };

            workflowDefinitionService.getWorkflowDefinitionsManagementList(params, function(err, data) {
                $location.search( $scope.pagination );
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


        $scope.changeDefinitionsPage = function(pageNumber) {
            $scope.pagination.definitionPage = pageNumber;
            getDefinitions()
        };

    }]);
});