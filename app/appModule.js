/**
 * Created by priit on 18.08.15.
 */
define(['stateConfig', 'angular-ui-router', 'angular-idle','ocLazyLoad', 'ui-bootstrap'], function (stateConfig) {

    var app = angular.module('keeleliin', [
        'ui.router',
        'ui.bootstrap',
        'oc.lazyLoad',
        'ngIdle'
    ]);

    app.config(function ($stateProvider, $urlRouterProvider) {
        stateConfig.setStates(app, $stateProvider, $urlRouterProvider);
    });

    return app;
});