/**
 * Created by priit on 18.08.15.
 */
require.config({
    baseUrl: "app",
    paths: {

        'angular'           : 'lib/bower_components/angular/angular.min',
        'angular-ui-router' : 'lib/bower_components/angular-ui-router/release/angular-ui-router.min',
        'angularAMD'        : 'lib/angularAMD',
        'jquery'            : 'lib/jquery/jquery-2.1.1.min',
        'jquery-ui'         : 'lib/plugins/jquery-ui/jquery-ui',
        'bootstrap'         : 'lib/bootstrap/bootstrap.min',
        'metisMenu'         : 'lib/plugins/metisMenu/jquery.metisMenu',
        'slimscroll'        : 'lib/plugins/slimscroll/jquery.slimscroll.min',
        'pace'              : 'lib/plugins/pace/pace.min',
        'inspinia'          : 'lib/inspinia',
        'ocLazyLoad'        : 'lib/bower_components/oclazyload/dist/ocLazyLoad.min',
        'angular-translate' : 'lib/bower_components/angular-translate/angular-translate.min',
        'angular-utils-pagination' : 'lib/bower_components/angularUtils-pagination/dirPagination',
        'etTranslations'   : 'i18n/et-translations',
        'ui-bootstrap'      : 'lib/bootstrap/ui-bootstrap-tpls-0.12.0.min',
        'angular-idle'      : 'lib/plugins/angular-idle/angular-idle',
        'jstree'            : 'lib/plugins/jsTree/jstree',
        'jstree-plugins'    : 'lib/keeleliin/jstree_plugins',
        'ng-jstree'         : 'lib/plugins/jsTree/ngJsTree',

        'footable'          : 'lib/plugins/footable/footable.all.min',
        'chosen-jquery'     : 'lib/plugins/chosen/chosen.jquery',
        'chosen'            : 'lib/plugins/chosen/chosen',

        'directives'        : 'directive/directives',
        'sidebarDirectives' : 'directive/sidebarDirectives',
        'stateConfig'       : 'config/stateConfig',

        'AuthController'    : 'controller/AuthController',
        'HomeController'    : 'controller/HomeController',
        'ProjectListController' : 'controller/ProjectListController',
        'ProjectViewController' : 'controller/project/ViewController',
        'MainController'    : 'controller/MainController',
        'WorkflowAddDefinitionModalController': 'controller/workflow/AddDefinitionModalController',
        'WorkflowDefinitionEditController' : 'controller/workflow/DefinitionEditController',
        'WorkflowViewController' : 'controller/workflow/ViewController',


        'ResourceTreeController' : 'controller/resource/TreeController',

        'UserController'    : 'controller/UserController',
        'UserListController': 'controller/UserListController',
        'UserService'       : 'service/UserService',
        'ProjectService'    : 'service/ProjectService',
        'WorkflowService'   : 'service/WorkflowService',

        'WorkflowDefinitionService': 'service/WorkflowDefinitionService',
        'ResourceService'   : 'service/ResourceService'
    },
    shim: {
        'angular'           : ['jquery'],
        'angularAMD'        : ['angular'],
        'angular-ui-router' : ['angular'],
        'ocLazyLoad'        : ['angular'],
        'angular-translate' : ['angular'],
        'angular-utils-pagination' : ['angular'],
        'metisMenu'         : ['angular'],
        'angular-idle'      : ['angular'],
        'ui-bootstrap'      : ['angular'],
        'bootstrap'         : ['jquery'],
        'inspinia'          : ['jquery'],
        'slimscroll'        : ['jquery'],
        'jquery-ui'         : ['jquery'],

        'directives'        : ['jquery', 'metisMenu', 'slimscroll'],
        'sidebarDirectives' : ['jquery', 'metisMenu', 'slimscroll'],
        'jstree-plugins'    : ['jstree', 'jquery'],
        'ng-jstree'         : ['angular', 'jstree', 'jstree-plugins', 'jquery'],
        'chosen'            : ['angular', 'chosen-jquery']
    },
    deps: ['app']
});

