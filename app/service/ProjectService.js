define(['angularAMD'], function (angularAMD) {

    angularAMD.service('ProjectService', [ '$http', 'config', '$modal','$log',
        function( $http, config, $modal, $log ) {
            var self = this;

            this.getList = function (params, callback ) {

                $http.get(config.API_URL + '/project', {params: params }).then(
                    function(data) {
                        console.log(data);
                        callback(null, data.data.data);
                    },
                    function(data) {
                        callback(data);
                    }
                );
            };

            this.getHomeProject = function ( callback ) {

                var params = {
                    sort: 'updated_at',
                    order: 'DESC',
                    page: 1,
                    perPage: 1
                };

                self.getList(params, function (err, data) {
                    if(err){
                        return callback(err);
                    }
                    return callback(null, data.rows[0]);
                });
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
                    templateUrl: '../../views/project/add_modal.html',
                    scope: $scope,
                    controller: 'ProjectCreateController'
                });
            };

            this.openUpdateModal = function ($scope) {

                var modalInstance = $modal.open({
                    templateUrl: '../../views/project/update_modal.html',
                    controller: 'ProjectUpdateController',
                    resolve: {
                        project: function(){
                            return $scope.project
                        }
                    }
                });

                modalInstance.result.then(function (project) {
                    $log.info('Project updated');
                    $scope.project = project;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });

                return modalInstance;
            };

            this.openDeleteModal = function ($scope, project) {

                return $modal.open({
                    templateUrl: '../../views/project/confirm_delete_modal.html',
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

            this.updateProject = function (project, updateProject, callback) {

                $http.put(config.API_URL + '/project/' + project.id, updateProject).then(
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