define([ 'angularAMD' ], function (angularAMD, resourceTreeMapper) {

    angularAMD.service('EntuService', [ '$log', '$http', 'config', '$modal','UserService',
        function( $log, $http, config, $modal, userService ) {
            var self = this;

            this.getResourcesList = function (params, callback) {
                $http.get(config.API_URL + '/entu/resource-list', {params: params}).then(
                    function(data) {
                        $log.log(data);
                        callback(null, data.data.data);
                    }
                );
            };

            this.getJsTreeMap = function( resourcesList ){

                var result = [];

                for( i in resourcesList){
                    var root = resourcesList[i];

                    var rootResult = {
                        id: root.scope + '-' + root.id,
                        text: root.name,
                        type    : "default",
                        children: []
                    };

                    for( j in root.children){
                        var child = root.children[j];

                        rootResult.children.push({
                            id: child.scope + '-' + child.id,
                            text: child.name,
                            type    : "text"
                        });
                    }

                    if( rootResult.children.length > 0 ){
                        result.push( rootResult );
                    }
                }

                return result;
            };
        }
    ]);
});