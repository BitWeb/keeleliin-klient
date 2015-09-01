define([
    'angularAMD',
    'ServiceService',
    'chosen',
    'icheck'
], function(angularAMD) {

    angularAMD.controller('ServiceAddController', ['$scope', '$stateParams', 'ServiceService',
        function( $scope, $stateParams, serviceService ) {

            var service = {
                "id": 1,
                "name": "Lausestaja",
                "description": null,
                "url": "http://dev.bitweb.ee:3001/api/v1/",
                "sid": "lau",
                "isSynchronous": false,
                "isActive": true,
                "serviceParams": [
                    {
                        "id": 1,
                        "type": "text",
                        "key": "isAsync",
                        "value": "1",
                        "isEditable": false,
                        "description": null,
                        "paramOptions": []
                    }
                ],
                "serviceInputTypes": [
                    {
                        "id": 1,
                        "key": "content",
                        "doParallel": false,
                        "sizeLimit": 0,
                        "sizeUnit": "byte",
                        "isList": false,
                        "resourceTypeId": 1
                    }
                ],
                "serviceOutputTypes": [
                    {
                        "id": 1,
                        "key": "output",
                        "resourceTypeId": 1
                    }
                ]
            };





        }]);
});