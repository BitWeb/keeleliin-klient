/**
 * Created by priit on 18.08.15.
 */

define(['angularAMD'], function (angularAMD) {

    return {
        setStates: function(app, $stateProvider, $urlRouterProvider){

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
                    templateUrl: "views/project/project-list-view.html",
                    controller: 'ProjectListController'
                })
            );







        }
    }
});
