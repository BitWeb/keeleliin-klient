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

            $stateProvider.state(
                'projects', angularAMD.route({
                    url: "/projects",
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

            $stateProvider.state(
                'project-item', angularAMD.route({
                    url: "/project/{id:[0-9]{1,8}}", //
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

            $stateProvider.state(
                'workflow-definition-edit', angularAMD.route({
                    url: "/workflow-definition/{id:[0-9]{1,8}}", //
                    templateUrl: "views/workflow/definition_edit.html",
                    controller: 'WorkflowDefinitionEditController'
                })
            );

            $stateProvider.state('users', angularAMD.route({
                url: '/users',
                templateUrl: 'views/user/list.html',
                controller: 'UserListController'
            }));

            $stateProvider.state('user', angularAMD.route({
                url: '/user/{id:[0-9]{1,8}}',
                templateUrl: 'views/user/edit.html',
                controller: 'UserEditController'
            }));

            $stateProvider.state(
                'workflow-view', angularAMD.route({
                    url: "/workflow-view/{id:[0-9]{1,8}}", //
                    templateUrl: "views/workflow/view.html",
                    controller: 'WorkflowViewController'
                })
            );

            $stateProvider.state('services', angularAMD.route({
                url: '/services',
                templateUrl: 'views/service/list.html',
                controller: 'ServiceListController'
            }));

            $stateProvider.state('service', angularAMD.route({
                url: '/service/{id:[0-9]{1,8}}',
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
                url: '/service',
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
        }
    }
});
