define(['appModule', 'slimscroll', 'jquery'], function (app) {

/**
 * dropZone - Directive for Drag and drop zone file upload plugin
 */
function dropZone() {
    return function(scope, element, attrs) {
        element.dropzone({
            url: "/upload",
            maxFilesize: 100,
            paramName: "uploadfile",
            maxThumbnailFilesize: 5,
            init: function() {
                scope.files.push({file: 'added'});
                this.on('success', function(file, json) {
                });
                this.on('addedfile', function(file) {
                    scope.$apply(function(){
                        alert(file);
                        scope.files.push({file: 'added'});
                    });
                });
                this.on('drop', function(file) {
                    alert('file');
                });
            }
        });
    }
}

/**
 * fullScroll - Directive for slimScroll with 100%
 */
function fullScroll($timeout){
    return {
        restrict: 'A',
        link: function(scope, element) {
            $timeout(function(){
                $(element).slimscroll({
                    height: '100%',
                    railOpacity: 0.9
                });

            });
        }
    };
}

/**
 * fitHeight - Directive for set height fit to window height
 */
function fitHeight(){
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.css("height", $(window).height() + "px");
            element.css("min-height", $(window).height() + "px");
        }
    };
}


function footableNgRow(){
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            var parentTable = angular.element(element).closest('table');
            var isLoaded = parentTable.hasClass('footable-loaded');
            if (scope.$last && !isLoaded) {
                //console.log('Creating Footable Something ?!?! ');
                parentTable.footable();
            } else if (scope.$last && isLoaded) {
                //console.log('Updating Footable Something ?!?! ');
                //console.log(parentTable.data('footable'));
                parentTable.data('footable').redraw();
            }

        }
    }
}

/**
 *
 * Pass all functions into module
 */
app.directive('dropZone', dropZone)
    .directive('fullScroll', fullScroll)
    .directive('fitHeight', fitHeight)
    .directive('footableNgRow', footableNgRow);



    app.directive('klStatus', ['$filter', function ($filter) {

        var statusClassMap = {
            INIT        : 'label-default',
            RUNNING     : 'label-primary',
            FINISHED    : 'label-success',
            CANCELLED   : 'label-warning',
            ERROR       : 'label-danger'
        };


        return {
            restrict: 'A',
            scope: {},
            link: function(scope, element, attrs) {

                element.addClass('label');
                element.addClass(statusClassMap[attrs.klStatus]);
                element.text( $filter('translate')(attrs.klStatus) );

            },

            controller: ['$scope','$element', '$attrs', function($scope, $element, $attrs ) {

                $attrs.$observe('klStatus', function(klStatus){
                    $element.removeClass('label-*');
                    $element.addClass(statusClassMap[klStatus]);
                    $element.text( $filter('translate')(klStatus) );
                });

            }]
        };
    }]);


});
