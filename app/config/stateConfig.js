/**
 * Created by priit on 18.08.15.
 */

define(['angularAMD'], function (angularAMD) {

    return {
        setStates: function(app, $stateProvider, $urlRouterProvider, $ocLazyLoad){

            $urlRouterProvider.otherwise("/auth");

            $stateProvider.state(
                'auth', angularAMD.route({
                    url: "/auth",
                    templateUrl: "views/auth/auth.html",
                    controller: 'AuthController'
                }));

            $stateProvider.state(
                'home', angularAMD.route({
                    url: "/home",
                    templateUrl: "views/home/home-view.html",
                    controller: 'HomeController'
                }));


            $stateProvider.state('projectState', {
                url: "/project",
                abstract: true,
                template: '<ui-view/>'
            });
            $stateProvider.state( 'projects',
                angularAMD.route({
                    parent: 'projectState',
                    url: "",
                    templateUrl: "views/project/list_view.html",
                    controller: 'ProjectListController',
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    insertBefore: '#loadBefore',
                                    name: 'localytics.directives',
                                    files: ['assets/css/plugins/chosen/chosen.css']
                                }
                            ]);
                        }
                    }
                })
            );
            $stateProvider.state( 'project-item',
                angularAMD.route({
                    parent: 'projectState',
                    url: "/{id:[0-9]{1,8}}", //
                    templateUrl: "views/project/view.html",
                    controller: 'ProjectViewController',
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    insertBefore: '#loadBefore',
                                    name: 'localytics.directives',
                                    files: ['assets/css/plugins/chosen/chosen.css']
                                }
                            ]);
                        }
                    }
                })
            );
            $stateProvider.state( 'workflow-definition-edit',
                angularAMD.route({
                    url: "/workflow-definition/{id:[0-9]{1,8}}", //
                    templateUrl: "views/workflow/definition_edit.html",
                    controller: 'WorkflowDefinitionEditController'
                })
            );

            $stateProvider.state('usersState', {
                url: '/user',
                abstract: true,
                template: '<ui-view/>'
            });
            $stateProvider.state('users', angularAMD.route({
                parent: 'usersState',
                url: '',
                templateUrl: 'views/user/list.html',
                controller: 'UserListController'
            }));
            $stateProvider.state('user-edit', angularAMD.route({
                parent: 'usersState',
                url: '/{id:[0-9]{1,8}}',
                templateUrl: 'views/user/edit.html',
                controller: 'UserEditController'
            }));


            $stateProvider.state(
                'workflow-view', angularAMD.route({
                    url: "/workflow/{id:[0-9]{1,8}}", //
                    templateUrl: "views/workflow/view.html",
                    controller: 'WorkflowViewController'
                })
            );

            $stateProvider.state(
                'workflow-resource-upload', angularAMD.route({
                    url: "/workflow/{id:[0-9]{1,8}}/resource-upload", //
                    templateUrl: "views/workflow/resource_upload.html",
                    controller: 'WorkflowResourceUploadController',
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    files: ['assets/css/plugins/dropzone/basic.css', 'assets/css/plugins/dropzone/dropzone.css', ]
                                }
                            ]);
                        }
                    }
                })
            );


            $stateProvider.state('serviceState', {
                abstract: true,
                url: '/service',
                template: '<ui-view/>'
            });
            $stateProvider.state('services', angularAMD.route({
                parent: 'serviceState',
                url: '',
                templateUrl: 'views/service/list.html',
                controller: 'ServiceListController'
            }));
            $stateProvider.state('service-edit', angularAMD.route({
                parent: 'serviceState',
                url: '/{id:[0-9]{1,8}}',
                templateUrl: 'views/service/edit.html',
                controller: 'ServiceEditController',
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                files: ['assets/css/plugins/iCheck/custom.css']
                            },
                            {
                                insertBefore: '#loadBefore',
                                name: 'localytics.directives',
                                files: ['assets/css/plugins/chosen/chosen.css']
                            }
                        ]);
                    }
                }
            }));
            $stateProvider.state('service-insert', angularAMD.route({
                parent: 'serviceState',
                url: '/insert',
                templateUrl: 'views/service/edit.html',
                controller: 'ServiceEditController',
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                files: ['assets/css/plugins/iCheck/custom.css']
                            },
                            {
                                insertBefore: '#loadBefore',
                                name: 'localytics.directives',
                                files: ['assets/css/plugins/chosen/chosen.css']
                            }
                        ]);
                    }
                }
            }));

            $stateProvider.state('resourceTypeState', {
                abstract: true,
                url: '/resource-type',
                template: '<ui-view/>'
            });
            $stateProvider.state('resource-types', angularAMD.route({
                parent: 'resourceTypeState',
                url: '',
                templateUrl: 'views/resource_type/list.html',
                controller: 'ResourceTypeListController'
            }));
            $stateProvider.state('resource-type-insert', angularAMD.route({
                parent: 'resourceTypeState',
                url: '/insert',
                templateUrl: 'views/resource_type/edit.html',
                controller: 'ResourceTypeEditController'
            }));
            $stateProvider.state('resource-type-edit', angularAMD.route({
                parent: 'resourceTypeState',
                url: '/{id:[0-9]{1,8}}',
                templateUrl: 'views/resource_type/edit.html',
                controller: 'ResourceTypeEditController'
            }));

        }
    }
});
