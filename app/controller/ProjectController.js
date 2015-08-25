define(['angularAMD','ProjectService', 'footable'], function (angularAMD) {

    angularAMD.controller('ProjectController', [ '$scope', '$state', '$stateParams', 'ProjectService','$modal',
        function($scope, $state, $stateParams, projectService, $modal) {
            console.log('ProjectController');


        }]);
});