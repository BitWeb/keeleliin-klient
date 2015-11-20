define([
    'angularAMD',
    'appModule',
    'config/global',
    'etTranslations',
    'stateConfig',
    'ocLazyLoad',
    'ErrorInterceptor',
    'UserService',
    'MainController',
    'AuthController',
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

], function (angularAMD, app, globalConf, etTranslations, stateConfig, $ocLazyLoad ) {

    app.config(['$stateProvider', '$urlRouterProvider', '$translateProvider','$httpProvider', '$provide', function ($stateProvider, $urlRouterProvider, $translateProvider, $httpProvider, $provide ) {
        $translateProvider.translations('et', etTranslations);
        $translateProvider.preferredLanguage('et');
        stateConfig.setStates( $stateProvider, $urlRouterProvider, $ocLazyLoad);

        $httpProvider.interceptors.push('ErrorInterceptor');

    }]);

    app.constant('config', globalConf);

    app.run(['$rootScope', '$state', '$stateParams', 'UserService','$log','$location','$window','$timeout', function ($rootScope, $state, $stateParams, userService, $log, $location, $window, $timeout) {

        $rootScope.isInitFinished = false;

        $rootScope.$state = $state;
        $rootScope.userService = userService;

        $rootScope.$on('notAuthenticated', function(event, fromState) {
            $log.log('Not auth event. Go auth');
            $state.go('auth');
            event.preventDefault();
        });

        $rootScope.$on('authenticated', function(event, fromState) {
            $log.log('Auth event .', fromState.current.name);
            $log.log('Go home from auth state');
            $state.go('home');
            event.preventDefault();
        });

        $rootScope.$on('$stateNotFound',
            function(event, unfoundState, fromState, fromParams){
                $log.error('State not found: ', unfoundState.to);
            });

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
            $log.error('State change error.'); // "lazy.state"
        });

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            $log.debug(' State change success loading state: ', toState.name);
            if(userService.isAuthenticated()){
                userService.setLandingPath($location.path());
            }
        });

        var initState = null;
        var initParams = null;

         var sChange = $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

            $log.debug('State change start. To state: ', toState.name + ' Is authenticated: ' + userService.isAuthenticated() );

            if($rootScope.isInitFinished == false){
                $log.debug('Prevent change before init is finished', toState);
                initState = toState;
                initParams = toParams;
                event.preventDefault();
                sChange();
                return;
            }

            if(userService.isAuthenticated() && toState.name == 'auth' && toState.abstract == false){
                $log.error('Already authenticated. Go home.');
                event.preventDefault();
                $state.go('home');
                return;
            }
            if(!userService.isAuthenticated() && toState.name && toState.name != 'auth'){
                $log.error('Some not auth state:  ' + toState.name + ' with path: ' + $location.path() );
                event.preventDefault();
                $state.go('auth');
                return;
            }
        });

        userService.init(function () {
            $rootScope.isInitFinished = true;

            console.log('Ready');

            if(initState){
                $log.debug('Go to init state: ', initState);
                $state.go(initState, initParams, {reload: true});
                return;
            }

            if(userService.isAuthenticated()){
                $log.debug('Is auth but No init state. Go home ');
                $state.go('home');
                return;
            }

            if(!userService.isAuthenticated()){
                $log.debug('Not authenticated. Go auth from ' + $state.current.name);
                userService.setLandingPath($location.path());
               // $state.go('auth');
                return;
            }
        });
    }]);

    return angularAMD.bootstrap(app);
});