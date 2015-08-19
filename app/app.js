define([
    'angularAMD',
    'appModule',
    'UserService',

    'MainController',
    'jquery',
    'jquery-ui',
    'bootstrap',
    'pace',
    'inspinia',
    'angular-translate',
    'jstree',
    'directives',
    'sidebarDirectives'
], function (angularAMD, app) {

    app.constant('config', {
            API_URL : 'http://dev.bitweb.ee:3000/api/v1'
        }
    );

    app.run(['$rootScope', '$state', '$stateParams', 'UserService', function ($rootScope, $state, $stateParams, userService) {
        $rootScope.$state = $state;
        $rootScope.userService = userService;
        userService.init();

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            if(!userService.isAuthorized( toState )){
                console.log('User not authorized. Wanted to go state: ' + toState.name);
                $state.go('auth');
                event.preventDefault();
            }
        });

        $rootScope.$on('notAuthorized', function(event, fromState) {
            console.error('Not authorized');
            console.log(fromState);
            $state.go('auth');
            event.preventDefault();
        });

        $rootScope.$on('authorized', function(event, fromState) {
            console.error('Authorized');
            if(fromState.current.name == 'auth'){
                $state.go('home');
                event.preventDefault();
            }
        });
    }]);

    return angularAMD.bootstrap(app);
});