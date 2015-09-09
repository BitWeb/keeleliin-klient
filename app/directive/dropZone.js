define(['angularAMD','jq-dropzone', 'jquery'], function (angularAMD) {
    /**
     * dropZone - Directive for Drag and drop zone file upload plugin
     */
    angularAMD.directive('dropZone', ['config', '$rootScope', '$http', function (config, $rootScope, $http) {

        return {
            restrict: 'A',
            transclude: true,
            link: function ($scope, $element, $attrs) {
                $element.dropzone({
                    url: config.API_URL + '/resource/upload',
                    autoProcessQueue: false,
                    params: $scope.resourceUploadParams,
                    maxFilesize: 100,
                    paramName: "resourceFile",
                    maxThumbnailFilesize: 5,
                    parallelUploads: 5,
                    method: 'POST',
                    uploadMultiple: false,
                    headers: $http.defaults.headers.common,
                    addRemoveLinks: true,
                    dictRemoveFile: 'Loobu',
                    //previewsContainer: null
                    init: function () {

                        var self = this;

                        $scope.uploadFiles.push({file: 'added'});
                        this.on('success', function (file, json) {
                            console.log('success');
                        });
                        this.on('addedfile', function (file) {
                            $scope.$apply(function () {
                                $scope.uploadFiles.push({file: 'added'});
                            });
                        });
                        this.on('drop', function (file) {
                            console.log('File dropped');
                        });

                        this.on('error', function (file, errorMessage, xhr) {
                            var response = JSON.parse(xhr.response);
                            alert('Faili üleslaadimisel tekkis viga: ' + response.errors);
                        });

                        this.on('complete', function (file) {
                            setTimeout(function () {
                                self.removeFile(file);
                            }, 1000);
                            $rootScope.$broadcast('resourceUpdated', null);
                        });

                        $scope.startUpload = function () {
                            self.processQueue();
                        }
                    },
                    accept: function (file, done) {
                        done();
                    }
                });
            }
        }
    }
    ]);
});
