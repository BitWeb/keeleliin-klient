define(['angularAMD'], function (angularAMD) {

    angularAMD.service('ProjectService', [ '$http', 'config', '$modal',
        function( $http, config, $modal ) {
            var self = this;

            this.getList = function ( callback ) {

                $http.get(config.API_URL + '/project').then(
                    function(data) {
                        console.log(data);
                        callback(null, data.data.data);
                    },
                    function(data) {
                        callback(data);
                    }
                );
            };

            this.deleteProject = function(project, callback){

                $http.delete(config.API_URL + '/project/' + project.id).then(
                    function(data, status) {
                        console.log(data.data);
                        callback(null, true);
                    },
                    function(data, status) {
                        if(!data){
                            return callback(status);
                        }
                        console.log(data);
                        callback(data);
                    }
                );
            };

            this.openCreateModal = function ($scope) {
                return $modal.open({
                    templateUrl: '../../views/project/add.html',
                    scope: $scope,
                    controller: 'ProjectCreateController'
                });
            };

            this.openDeleteModal = function ($scope, project) {

                return $modal.open({
                    templateUrl: '../../views/project/confirm-delete.html',
                    scope: $scope,
                    controller: 'ProjectDeleteController',
                    resolve: {
                        project: function(){
                            return project;
                        }
                    }
                });
            };


            this.addProject = function (project, callback) {
                //todo refactor UI
                var usersMap = [];
                for(i in project.users){
                    usersMap.push({
                        userId: project.users[i],
                        role: 'editor'
                    });
                }

                project.users = usersMap;

                $http.post(config.API_URL + '/project', project).then(
                    function(data, status) {
                        console.log(data.data);
                        callback(null, data.data.data);
                    },
                    function(data, status) {
                        if(!data){
                            return callback(status);
                        }
                        console.log(data);
                        callback(data);
                    }
                );
            };

            this.getProject = function (id, callback) {

                $http.get(config.API_URL + '/project/' + id).then(
                    function(data) {
                        console.log(data);
                        callback(null, data.data.data);
                    },
                    function(data) {
                        callback(data);
                    }
                );
            };

            this.getProjectWorkflows = function (id, callback) {

                $http.get(config.API_URL + '/project/' + id + '/workflows').then(
                    function(data) {
                        console.log(data);
                        callback(null, data.data.data);
                    },
                    function(data) {
                        callback(data);
                    }
                );
            };


        }
    ]);
});