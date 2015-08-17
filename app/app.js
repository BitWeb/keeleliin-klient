'use strict';

var keeleliinControllers = angular.module('keeleliinControllers', []);

var app = angular.module('keeleliin', [
  'ui.router',
  'keeleliinControllers'
]);

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/home");
  $stateProvider
      .state('home', {
        url: "/home",
        templateUrl: "app/components/home/home-view.html",
        controller: "HomeController"
      })
      .state('project', {
        url: "/project",
        templateUrl: "app/components/project/project-list-view.html",
        controller: "ProjectController"
      });

});

app.run(['$rootScope', '$state', '$stateParams', function ($rootScope,   $state,   $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
}]);