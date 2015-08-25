/**
 * Created by priit on 18.08.15.
 */

define(['angularAMD'], function (angularAMD) {

    return {
        setStates: function(app, $stateProvider, $urlRouterProvider, $ocLazyLoad){

            $urlRouterProvider.otherwise("/auth");

            $stateProvider.state(
                'auth', angularAMD.route({
                    url: "/auth",
                    templateUrl: "views/auth/auth.html",
                    controller: 'AuthController'
                }));
            $stateProvider.state(
                'home', angularAMD.route({
                    url: "/home",
                    templateUrl: "views/home/home-view.html",
                    controller: 'HomeController'
                }));

            $stateProvider.state(
                'project', angularAMD.route({
                    url: "/project",
                    templateUrl: "views/project/list-view.html",
                    controller: 'ProjectListController',
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    insertBefore: '#loadBefore',
                                    name: 'localytics.directives',
                                    files: ['assets/css/plugins/chosen/chosen.css']
                                }
                            ]);
                        }
                    }
                })
            );

            $stateProvider.state(
                'project-item', angularAMD.route({
                    url: "/project/{id:[0-9]{1,8}}", //
                    templateUrl: "views/project/view.html",
                    controller: 'ProjectController'
                })
            );
        }
    }
});
