/**
 * Created by priit on 18.08.15.
 */

define(['angularAMD'], function (angularAMD) {

    return {
        setStates: function (app, $stateProvider, $urlRouterProvider, $ocLazyLoad) {

            $urlRouterProvider.otherwise("/auth");

            $stateProvider.state(
                'auth', angularAMD.route({
                    url: "/auth",
                    templateUrl: "views/auth/auth.html",
                    controller: 'AuthController',
                    breadcrumb: {
                        title: 'Sisselogimine'
                    }
                }));

            $stateProvider.state(
                'home', angularAMD.route({
                    url: "/home",
                    templateUrl: "views/home/home-view.html",
                    controller: 'HomeController',
                    breadcrumb: {
                        hide: true,
                        title: 'Avaleht'
                    }
                }));

            $stateProvider.state('projectState', {
                url: "/project",
                abstract: true,
                template: '<ui-view/>'
            });

            $stateProvider.state('projects',
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
                    },
                    breadcrumb: {
                        parent: 'home',
                        title: 'Projektid'
                    }
                })
            );

            $stateProvider.state('projectItemState', {
                parent: 'projectState',
                url: "/{projectId:[0-9]{1,8}}",
                abstract: true,
                template: '<ui-view/>'
            });

            $stateProvider.state('project-item',
                angularAMD.route({
                    parent: 'projectItemState',
                    url: "", //
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
                    },
                    breadcrumb: {
                        parent: 'projects',
                        title: '{{projectId}}',
                        attributes: '{projectId: projectId}'
                    }
                })
            );
            $stateProvider.state('project-resource-upload',
                angularAMD.route({
                    parent: 'projectItemState',
                    url: "/resource-upload", //
                    templateUrl: "views/project/resource_upload.html",
                    controller: 'ProjectResourceUploadController',
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    files: ['assets/css/plugins/dropzone/basic.css', 'assets/css/plugins/dropzone/dropzone.css']
                                }
                            ]);
                        }
                    },
                    breadcrumb: {
                        parent: 'project-item',
                        title: 'Ressursside haldus',
                        attributes: '{projectId: projectId}'
                    }
                })
            );

            $stateProvider.state('workflowItemState', {
                parent: 'projectItemState',
                url: "/workflow/{workflowId:[0-9]{1,8}}",
                abstract: true,
                template: '<ui-view/>'
            });

            $stateProvider.state('workflow-definition-edit',
                angularAMD.route({
                    parent: 'workflowItemState',
                    url: "/definition", //
                    templateUrl: "views/workflow/definition_edit.html",
                    controller: 'WorkflowDefinitionEditController',
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
                    },
                    breadcrumb: {
                        parent: 'project-item',
                        title: 'Töövoo {{workflowId}} definitsioon',
                        attributes: '{workflowId: workflowId}'
                    }
                })
            ).state( 'workflow-view',
                angularAMD.route({
                    parent: 'workflowItemState',
                    url: "", //
                    templateUrl: "views/workflow/view.html",
                    controller: 'WorkflowViewController',
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
                    },
                    breadcrumb: {
                        parent: 'project-item',
                        title: "{{workflowId}}",
                        attributes: '{workflowId: workflowId}'
                    }
                })
            ).state(
                'workflow-resource-upload', angularAMD.route({
                    parent: 'workflowItemState',
                    url: "/resource-upload", //
                    templateUrl: "views/workflow/resource_upload.html",
                    controller: 'WorkflowResourceUploadController',
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    files: ['assets/css/plugins/dropzone/basic.css', 'assets/css/plugins/dropzone/dropzone.css',]
                                }
                            ]);
                        }
                    },
                    breadcrumb: {
                        parent: 'workflow-definition-edit',
                        title: "Ressursside lisamine",
                        attributes: '{workflowId: workflowId}'
                    }
                })
            );


            $stateProvider.state('workflowManagementState', {
                url: "/workflow-management",
                abstract: true,
                template: '<ui-view/>'
            }
            ).state('workflow-management-list',
                angularAMD.route({
                    parent: 'workflowManagementState',
                    url: "", //
                    templateUrl: "views/workflow/management_list.html",
                    controller: 'WorkflowManagementListController',
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
                    },
                    breadcrumb: {
                        parent: 'home',
                        title: 'Töövoogude haldus'
                    }
                })
            ).state( 'workflow-management-item',
                angularAMD.route({
                    parent: 'workflowManagementState',
                    url: "/workflow/{workflowId:[0-9]{1,8}}",
                    templateUrl: "views/workflow/view.html",
                    controller: 'WorkflowViewController',
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
                    },
                    breadcrumb: {
                        parent: 'workflow-management-list',
                        title: "{{workflowId}}",
                        attributes: '{workflowId: workflowId}'
                    }
                })
            );
            ///


            $stateProvider.state('serviceState', {
                abstract: true,
                url: '/service',
                template: '<ui-view/>'
            }
            ).state('services', angularAMD.route({
                parent: 'serviceState',
                url: '',
                templateUrl: 'views/service/list.html',
                controller: 'ServiceListController',
                breadcrumb: {
                    parent: 'home',
                    title: "Teenuste haldus"
                }
            })
            ).state('service-edit', angularAMD.route({
                parent: 'serviceState',
                url: '/{serviceId:[0-9]{1,8}}',
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
                },
                breadcrumb: {
                    parent: 'services',
                    title: "{{serviceId}}",
                    attributes: '{serviceId: serviceId}'
                }
            })
            ).state('service-insert', angularAMD.route({
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
                },
                breadcrumb: {
                    parent: 'services',
                    title: "Teenuse lisamine"
                }
            }));

            $stateProvider.state('resourceTypeState', {
                abstract: true,
                url: '/resource-type',
                template: '<ui-view/>'
            }
            ).state('resource-types', angularAMD.route({
                parent: 'resourceTypeState',
                url: '',
                templateUrl: 'views/resource_type/list.html',
                controller: 'ResourceTypeListController',
                breadcrumb: {
                    parent: 'home',
                    title: "Ressursi tüüpide haldus"
                }
            })
            ).state('resource-type-insert', angularAMD.route({
                parent: 'resourceTypeState',
                url: '/insert',
                templateUrl: 'views/resource_type/edit.html',
                controller: 'ResourceTypeEditController',
                breadcrumb: {
                    parent: 'resource-types',
                    title: "Ressursi tüübi lisamine"
                }
            })
            ).state('resource-type-edit', angularAMD.route({
                parent: 'resourceTypeState',
                url: '/{resourceTypeId:[0-9]{1,8}}',
                templateUrl: 'views/resource_type/edit.html',
                controller: 'ResourceTypeEditController',
                breadcrumb: {
                    parent: 'resource-types',
                    title: '{{resourceTypeId}}',
                    attributes: '{resourceTypeId: resourceTypeId}'
                }
            }));

            $stateProvider.state('usersState',
                {
                    url: '/user',
                    abstract: true,
                    template: '<ui-view/>'
                }
            ).state('users', angularAMD.route({
                    parent: 'usersState',
                    url: '',
                    templateUrl: 'views/user/list.html',
                    controller: 'UserListController',
                    breadcrumb: {
                        parent: 'home',
                        title: 'Kasutajate haldus'
                    }
                })
            ).state('user-edit', angularAMD.route({
                    parent: 'usersState',
                    url: '/{userId:[0-9]{1,8}}',
                    templateUrl: 'views/user/edit.html',
                    controller: 'UserEditController',
                    breadcrumb: {
                        parent: 'users',
                        title: "{{userId}}",
                        attributes: '{userId: userId}'
                    }
                })
            );
        }
    }
});