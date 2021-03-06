/**
 * Created by priit on 18.08.15.
 */
define(['stateConfig', 'etTranslations', 'ocLazyLoad', 'angular-ui-router', 'angular-idle', 'angular-cookies', 'ui-bootstrap'], function (stateConfig, etTranslations, $ocLazyLoad) {

    var app = angular.module('keeleliin', [
        'ui.router',
        'ui.bootstrap',
        'oc.lazyLoad',
        'pascalprecht.translate',       // Angular Translate
        'ngIdle',
        'ngCookies'
    ]);

    return app;
});