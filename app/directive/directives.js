define(['appModule', 'slimscroll', 'jquery'], function (app) {

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
 * icheck - Directive for custom checkbox icheck
 */
function icheck($timeout) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function($scope, element, $attrs, ngModel) {
            return $timeout(function() {
                var value;
                value = $attrs['value'];

                $scope.$watch($attrs['ngModel'], function(newValue){
                    $(element).iCheck('update');
                });

                return $(element).iCheck({
                    checkboxClass: 'icheckbox_square-green',
                    radioClass: 'iradio_square-green'

                }).on('ifChanged', function(event) {
                    if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                        $scope.$apply(function() {
                            return ngModel.$setViewValue(event.target.checked);
                        });
                    }
                    if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                        return $scope.$apply(function() {
                            return ngModel.$setViewValue(value);
                        });
                    }
                });
            });
        }
    };
}

    /**
 *
 * Pass all functions into module
 */
app.directive('fullScroll', fullScroll)
    .directive('fitHeight', fitHeight)
    .directive('footableNgRow', footableNgRow)
    .directive('icheck', icheck);

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
