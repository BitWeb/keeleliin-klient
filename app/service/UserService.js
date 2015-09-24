define(['appModule'], function (app) {

    app.service('UserService', [ '$http','$state','config','$location','$rootScope','$timeout','$log',
        function($http, $state, config, $location, $rootScope, $timeout, $log) {
            var self = this;

            var user = null;
            var isAuthenticated = false;

            this.init = function ( callback ) {
                var token = self.getToken();
                if(token){
                    self.setupHttpHeader( token );
                }

                return self._requestUserInfo( callback );
            };

            this.isAuthenticated = function () {
                return isAuthenticated;
            };

            this.signOut = function () {

                $http.get(config.API_URL + '/user/logout').
                    then(function(response) {
                        //$state.go('auth');
                        user = null;
                        self.removeToken();
                        isAuthenticated = false;
                        $rootScope.user = null;
                        $rootScope.$broadcast('notAuthenticated', $state);
                    }, function(response) {
                        console.error(response);
                    });
                return true;
            };

            this.startAuth = function () {

                var returnPath =  self.getLandingPath() ? encodeURIComponent(self.getLandingPath()) : ($location.protocol() + '%3A%2F%2F' + location.host);

                var queryUrl = config.API_URL + '/user/login/' + returnPath;
                $http.get(queryUrl).
                    then(function(response) {
                        if(response.data.data){
                            if(response.data.data.authUrl){
                                self.setToken(response.data.data.token);
                                window.location.href = response.data.data.authUrl;
                            } else {
                                self.updateUserInfo(response.data);
                            }
                        } else {
                            console.error(response);
                        }
                    }, function(response) {
                        console.error(response);
                    });
            };

            this._requestUserInfo = function ( callback ) {

                if(!self.getToken()){
                    callback();
                    return;
                }

                $http.get( config.API_URL + '/user').then(function ( response ) {
                    self.updateUserInfo(response.data);
                    callback();
                }, function ( response ) {
                    self.updateUserInfo(response.data);
                    callback();
                });
            };

            this.updateUserInfo = function (userData) {

                if(userData.statusCode != 200){
                    self.signOut();
                } else {
                    isAuthenticated = true;
                    user = userData.data;
                    $rootScope.user = user;
                    $rootScope.$broadcast('authenticated', $state);
                    self.doHeardBeat();
                }
            };

            this.setToken = function (token) {
                self.setupHttpHeader(token);
                return  window.sessionStorage.setItem('token', token);
            };

            this.getToken = function(){
                return  window.sessionStorage.getItem('token');
            };

            this.removeToken = function () {
                return  window.sessionStorage.removeItem('token');
            };

            this.getLandingPath = function () {
                return  window.sessionStorage.getItem('landingPath');
            };
            this.setLandingPath = function (landingPath) {
                return  window.sessionStorage.setItem('landingPath', landingPath);
            };
            this.removeLandingPath = function () {
                return  window.sessionStorage.removeItem('landingPath');
            };


            this.setupHttpHeader = function(token) {
                $http.defaults.headers.common['x-access-token'] = token;
            };

            this.getUser = function(id, callback) {
                $http.get(config.API_URL + '/user/' + id + '/details').then(function(response) {
                    callback(null, response.data.data);
                }, function(response) {
                    callback(response);
                });
            };

            this.getUsersList = function (pagination, callback) {

                pagination = pagination  || {};

                $http.get(config.API_URL + '/user/list', {params: pagination}).then(function (response) {
                    callback(null, response.data.data);
                }, function (response) {
                    callback(response);
                });
            };

            this.updateUser = function(user, callback) {
                var userData = {
                    role: user.role,
                    isActive: user.is_active
                };
                $http.put(config.API_URL + '/user/' + user.id + '/details', userData).then(function(response) {
                    callback(response.errors, response.data);
                }, function(response) {
                    callback(response);
                });
            };

            var timeoutPromise = null;


            this.doHeardBeat = function () {

                if(!self.isAuthenticated){
                    return;
                }

                if(timeoutPromise){
                    $timeout.cancel(timeoutPromise);
                }

                $http.post(config.API_URL + '/user/heart-beat', {}).then(function(response) {
                    $rootScope.notificationsSummary = response.data.data;
                    if(!config.hearbeat_interval){
                        return
                    }
                    timeoutPromise = $timeout(function () {

                        if(!self.isAuthenticated){
                            return;
                        }
                        self.doHeardBeat();

                    }, config.hearbeat_interval);

                }, function(response) {
                    $log.error(response);
                });

            };
        }
    ]);
});