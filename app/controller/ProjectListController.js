define(['angularAMD','ProjectService'], function (angularAMD) {

angularAMD.controller('ProjectListController', ['$scope','$state', '$stateParams', 'ProjectService',
    function($scope, $state, $stateParams, projectService) {
        console.log('ProjectController');

        projectService.getList({}, function (err, data) {

            if(err){
                //todo
            }

            $scope.totalCount = data.count;
            $scope.projects = data.rows;

            console.log(data);

        });



    }]);
});