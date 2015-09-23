define([
    'angularAMD',
    'appModule',
    'config/global',
    'UserService',
    'MainController',
    'jquery',
    'jquery-ui',
    'bootstrap',
    'pace',
    'inspinia',
    'angular-translate',
    'directives',
    'breadcrumb',
    'sidebarDirectives',
    'ui-bootstrap',
    'icheck'

], function (angularAMD, app, globalConf) {

    app.constant('config', globalConf);

    app.run(['$rootScope', '$state', '$stateParams', 'UserService', function ($rootScope, $state, $stateParams, userService) {
        $rootScope.$state = $state;
        $rootScope.userService = userService;

        $rootScope.$on('notAuthenticated', function(event, fromState) {
            userService.setLandingPath(window.location.href);
            $state.go('auth');
            event.preventDefault();
        });

        $rootScope.$on('authenticated', function(event, fromState) {
            userService.removeLandingPath();
            if(fromState.current.name == 'auth'){
                $state.go('home');
                event.preventDefault();
            }
        });

        userService.init(function () {

            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

                if(userService.isAuthenticated() && toState.name == 'auth'){
                    $state.go('home');
                    event.preventDefault();
                    return;
                }

                if(!userService.isAuthenticated() && toState.name != 'auth'){
                    $state.go('auth');
                    event.preventDefault();
                    return;
                }
            });
        });
    }]);

    return angularAMD.bootstrap(app);
});