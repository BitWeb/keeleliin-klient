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
        'etTranslations'    : 'i18n/et-translations',
        'ui-bootstrap'      : 'lib/bootstrap/ui-bootstrap-tpls-0.12.0.min',
        'ui-sortable'       : 'lib/plugins/ui-sortable/sortable',
        'angular-idle'      : 'lib/plugins/angular-idle/angular-idle',
        'jstree'            : 'lib/plugins/jsTree/jstree',
        'jstree-plugins'    : 'lib/keeleliin/jstree_plugins',
        'ng-jstree'         : 'lib/keeleliin/ngJsTree',
        'icheck'            : 'lib/plugins/iCheck/icheck.min',
        'footable'          : 'lib/plugins/footable/footable.all.min',
        'chosen-jquery'     : 'lib/plugins/chosen/chosen.jquery',
        'chosen'            : 'lib/plugins/chosen/chosen',
        'jq-dropzone'       : 'lib/plugins/dropzone/dropzone',

        'directives'        : 'directive/directives',
        'sidebarDirectives' : 'directive/sidebarDirectives',
        'filetree'          : 'directive/filetree',
        'drop-zone'         : 'directive/dropZone',

        'stateConfig'       : 'config/stateConfig',
        'AuthController'        : 'controller/AuthController',
        'HomeController'        : 'controller/HomeController',
        'ProjectListController' : 'controller/project/ListController',
        'ProjectViewController' : 'controller/project/ViewController',
        'MainController'        : 'controller/MainController',
        'WorkflowAddDefinitionModalController': 'controller/workflow/AddDefinitionModalController',
        'WorkflowDefinitionEditController' : 'controller/workflow/DefinitionEditController',
        'WorkflowViewController'    : 'controller/workflow/ViewController',
        'WorkflowResourceUploadController' : 'controller/workflow/ResourceUploadController',
        'ServiceListController'     : 'controller/service/ListController',
        'ServiceEditController'     : 'controller/service/EditController',

        'ResourceTypeListController': 'controller/resource_type/ListController',
        'ResourceTypeEditController': 'controller/resource_type/EditController',

        'ResourceInfoController'    : 'controller/resource/InfoController',
        'ResourceDeleteController'    : 'controller/resource/DeleteController',

        'UserEditController'        : 'controller/user/EditController',
        'UserListController'        : 'controller/user/ListController',
        'UserService'               : 'service/UserService',
        'ProjectService'            : 'service/ProjectService',
        'WorkflowService'           : 'service/WorkflowService',
        'WorkflowDefinitionService' : 'service/WorkflowDefinitionService',
        'ResourceService'           : 'service/ResourceService',
        'ServiceService'            : 'service/ServiceService',
        'ResourceTypeService'       : 'service/ResourceTypeService'
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
        'ui-sortable'       : ['angular','jquery'],


        'bootstrap'         : ['jquery'],
        'inspinia'          : ['jquery'],
        'slimscroll'        : ['jquery'],
        'jquery-ui'         : ['jquery'],
        'directives'        : ['jquery', 'metisMenu', 'slimscroll'],
        'drop-zone'         : ['angular'],

        'WorkflowResourceUploadController' : ['drop-zone'],

        'sidebarDirectives' : ['jquery', 'metisMenu', 'slimscroll'],
        'jstree-plugins'    : ['jstree', 'jquery'],
        'ng-jstree'         : ['angular', 'jstree', 'jstree-plugins', 'jquery'],
        'filetree'          : ['ng-jstree'],
        'icheck'            : ['angular','jquery'],
        'chosen'            : ['angular', 'chosen-jquery']
    },
    deps: ['app']
});

