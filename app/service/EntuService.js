define([ 'angularAMD' ], function (angularAMD, resourceTreeMapper) {

    angularAMD.service('EntuService', [ '$log', '$http', 'config', '$modal','UserService',
        function( $log, $http, config, $modal, userService ) {
            var self = this;

            this.getResourcesList = function (params, callback) {
                $http.get(config.API_URL + '/entu/resource', {params: params}).then(
                    function(data) {
                        $log.log(data);
                        callback(null, data.data.data);
                    }
                );
            };

            this.getResourceFilesList = function (entityId, callback) {
                $http.get(config.API_URL + '/entu/resource/' + entityId + '/files', {params: {}}).then(
                    function(data) {
                        $log.log(data);
                        callback(null, data.data.data);
                    }
                );
            };

            this.getEntuNodeChildren = function (node, params, callback) {

                if(node.id === "#"){
                    return callback(null, [
                        {
                            "text" : "Entu",
                            "id" : "root",
                            "data": {
                                "scope": "root"
                            },
                            'state' : {
                                'opened' : true
                            },
                            "children" : true
                        }]);
                }

                if(node.data && node.data.scope == 'root'){

                    self.getResourcesList( params, function (err, data) {
                        var nodes = [];
                        for( var i = 0, length = data.length; i < length; i++){
                            var item = data[i];
                            nodes.push({
                               text: item.name,
                                id: item.id,
                                data: {
                                    scope: item.scope
                                },
                                children : true

                            });
                        }
                        callback(null, nodes);
                    });
                    return;
                }

                if(node.data && node.data.scope == 'entity'){

                    self.getResourceFilesList(node.id, function (err, data) {
                        var nodes = [];
                        for( var i = 0, length = data.length; i < length; i++){
                            var item = data[i];
                            nodes.push({
                                text: item.name,
                                id: 'file-' + item.id,
                                data: {
                                    scope: item.scope
                                },
                                type    : 'text',
                                children : false

                            });
                        }
                        callback(null, nodes);
                    });
                    return;
                }

                console.error('');
                callback(null, []);
            };

        }
    ]);
});