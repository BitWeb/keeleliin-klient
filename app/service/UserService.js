define(['appModule'], function (app) {

    app.service('UserService', [ '$http','$state','config','$location','$rootScope',
        function($http, $state, config, $location, $rootScope) {
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

            this.isAuthorized = function( toState ){

                if( toState.name != 'auth' && !isAuthenticated ){
                    console.log(user);
                    console.log('Not authorized');
                    return false;
                }
                console.log('Authorized for state ' + toState.name);
                return true;
            };

            this.signOut = function () {
                user = null;
                self.removeToken();
                isAuthenticated = false;
                $rootScope.user = null;

                $http.get(config.API_URL + '/user/logout').
                    then(function(response) {
                        $rootScope.$broadcast('notAuthorized', $state);
                    }, function(response) {
                        console.error(response);
                    });
                return true;
            };

            this.startAuth = function () {
                var queryUrl = config.API_URL + '/user/login/' + $location.protocol() + '%3A%2F%2F' + location.host;
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
                console.log('Request user Info');
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
                    console.log('gotUser');
                    $rootScope.user = user;
                    $rootScope.$broadcast('authorized', $state);
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

                console.log($http.defaults.headers.common);


                console.log('Request user Info');
                pagination = pagination  || {};
                var url = config.API_URL + '/user/list?',
                    isParamAdded = false;

                if (pagination.page && pagination.perPage) {
                    url += 'page=' + pagination.page + '&perPage=' + pagination.perPage;
                    isParamAdded = true;
                }

                if (pagination.name) {
                    url += (isParamAdded ? '&' : '') + 'name=' + pagination.name;
                    isParamAdded = true;
                }

                if (pagination.role) {
                    url += (isParamAdded ? '&' : '') + 'role=' + pagination.role;
                }

                $http.get(url).then(function (response) {

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
            }
        }
    ]);
});