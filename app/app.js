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
    'sidebarDirectives',
    'ui-bootstrap',
    'icheck'

], function (angularAMD, app, globalConf) {

    app.constant('config', globalConf);

    app.run(['$rootScope', '$state', '$stateParams', 'UserService', function ($rootScope, $state, $stateParams, userService) {
        $rootScope.$state = $state;
        $rootScope.userService = userService;

        $rootScope.$on('notAuthorized', function(event, fromState) {
            console.info('Not authorized');
            console.log(fromState);
            $state.go('auth');
            event.preventDefault();
        });

        $rootScope.$on('authorized', function(event, fromState) {
            console.info('Authorized');
            if(fromState.current.name == 'auth'){
                $state.go('home');
                event.preventDefault();
            }
        });

        userService.init(function () {

            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                console.info('$stateChangeStart', toState);

                if(!userService.isAuthorized( toState )){
                    console.log('User not authorized. Wanted to go state: ' + toState.name);
                    $state.go('auth');
                    event.preventDefault();
                }
            });
        });
    }]);

    return angularAMD.bootstrap(app);
});