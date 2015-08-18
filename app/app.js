define([
    'angularAMD',
    'appModule',
    'MainController',
    'jquery',
    'jquery-ui',
    'bootstrap',
    'pace',
    'inspinia',
    'angular-translate',
    'jstree',
    'directives',
    'sidebarDirectives',
    'UserService'

], function (angularAMD, app) {

    app.run(['$rootScope', '$state', '$stateParams', 'UserService', function ($rootScope, $state, $stateParams, userService) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.userService = userService;

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            if(!userService.isAuthenticated() && toState.name != 'auth'){
                console.log('Go Auth');
                $state.transitionTo("auth");
                event.preventDefault();
            }
        });
    }]);

    return angularAMD.bootstrap(app);
});