define(['appModule'], function (app) {

    app.directive('klBreadcrumb', ['$http','config', '$state', '$stateParams', function ( $http, config, $state, $stateParams ) {

        var self = this;

        this.getStatesList = function ( state, list ) {

            list.push(state);
            if(!state || !state.breadcrumb){
                return list;
            }
            if(state.breadcrumb.parent){
                var parentState = $state.get(state.breadcrumb.parent);
                if(!parentState){
                    return list;
                }
                return self.getStatesList(parentState, list);
            }
            return list;
        };

        this.loadTitles = function (loadData, callback) {

            //return if nothing to query
            if(Object.keys(loadData).length == 0){
                return callback(null, {});
            }

            $http.get(config.API_URL + '/meta/breadcrumb', {params: loadData}).then(
                function (data) {
                    callback(null, data.data.data);
                },function (data) {
                    console.error(data);
                }
            );
        };

        this.updateBreadcrumb = function ($scope) {

            var statesList = self.getStatesList( $state.current, []).reverse();
            var listMap = statesList.map(function ( item ) {
                return {
                    title: item.breadcrumb.title,
                    shref: item.name + '('+ item.breadcrumb.attributes +')'
                }
            });

            var loadData = {};
            var replaceableList = listMap.map(function (item) {
                var matche = item.title.match(/{{(.*?)}}/);

                if(!matche){
                    return item;
                }
                item.replaceable = matche[0];
                item.replaceableKey = matche[1];
                loadData[ matche[1] ] = $stateParams[ matche[1] ];
                $scope[matche[1]] = $stateParams[ matche[1] ];
                return item;
            });

            self.loadTitles( loadData, function (err, data) {

                var replacedList = replaceableList.map(function (item) {
                    if(!item.replaceableKey){
                        return item;
                    }
                    item.title = item.title.replace(item.replaceable, data[item.replaceableKey]);
                    return item;
                });

                $scope.breadcrumb = {
                    title: replacedList[replacedList.length-1].title,
                    links: replacedList
                };
            });
        };

        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'views/sidebar/breadcrumb.html',
            link: function (scope, element, attrs) {
                scope.$on('updateBreadcrumb', function(event) {
                    self.updateBreadcrumb( scope );
                });
            },
            controller: ['$scope', function( $scope ) {
                self.updateBreadcrumb( $scope );
            }]
        };
    }]);
});
