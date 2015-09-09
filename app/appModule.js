/**
 * Created by priit on 18.08.15.
 */
define(['stateConfig', 'etTranslations', 'ocLazyLoad', 'angular-ui-router', 'angular-idle', 'ui-bootstrap'], function (stateConfig, etTranslations, $ocLazyLoad) {

    var app = angular.module('keeleliin', [
        'ui.router',
        'ui.bootstrap',
        'oc.lazyLoad',
        'pascalprecht.translate',       // Angular Translate
        'ngIdle'
    ]);

    app.config(['$stateProvider', '$urlRouterProvider', '$translateProvider', function ($stateProvider, $urlRouterProvider, $translateProvider) {

        $translateProvider.translations('et', etTranslations);
        $translateProvider.preferredLanguage('et');
        stateConfig.setStates(app, $stateProvider, $urlRouterProvider, $ocLazyLoad);
    }]);

    return app;
});