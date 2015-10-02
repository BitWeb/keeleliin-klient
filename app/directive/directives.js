define(['appModule', 'slimscroll', 'jquery', 'NotificationService'], function (app) {

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

    app.directive('klWorkflowRuntime', ['$filter', function ($filter) {

        var statusClassMap = {
            INIT        : 'label-default',
            RUNNING     : 'label-primary',
            FINISHED    : 'label-success',
            CANCELLED   : 'label-warning',
            ERROR       : 'label-danger'
        };

        function findTime(element, status, start, end) {

            if(status == 'INIT'){
                return element.text('00:00:00');
            }
            var startDate = new Date(start);
            var endDate = end ? new Date(end) : new Date();
            var timeDiff = Math.abs(startDate.getTime() - endDate.getTime());
            //tundi
            var hour = Math.floor( timeDiff  / (1000 * 60 * 60) );
            //min
            var min = Math.floor( (timeDiff - (hour * 1000 * 60 * 60)) / (1000 * 60 ) );
            //sec
            var sec = Math.floor( (timeDiff - (min * 1000 * 60 )) / (1000) );

            var format = function (value) {
                var stringvalue = value.toString();
                if(stringvalue.length == 1){
                    stringvalue = '0' + stringvalue;
                }
                return stringvalue;
            };
            var time = format(hour) + ':' + format(min) + ':' + format(sec);
            element.text( time );
        }

        return {
            restrict: 'A',
            scope: {},
            link: function(scope, element, attrs) {
                element.addClass('label');
                element.addClass(statusClassMap[attrs.status]);
                findTime(element, attrs.status, attrs.start, attrs.end);
            }
        };
    }]);

    //
    app.directive('klSaveButton', ['$filter', function ($filter) {

        return {
            restrict: 'A',
            scope: {},
            template: '<i class="fa fa-save"></i> {{message}} ',
            controller: ['$scope','$element', '$attrs', function($scope, $element, $attrs ) {

                var messages = $attrs.messages.split(':');

                var enabled = false;
                var processing = false;
                var wasProcessing = false;


                var updateMessage = function () {
                    if(processing){
                        $scope.message = messages[1];
                        wasProcessing = true;
                        return;
                    }
                    if(wasProcessing == true){
                        $scope.message = messages[2];
                        wasProcessing = false;
                        return;
                    }
                    $scope.message = messages[0];
                };

                var updateStatus = function () {
                    if(processing){
                        $element.attr('disabled', true);
                        return;
                    }
                    if(enabled){
                        $element.removeAttr('disabled');
                        return;
                    }
                    $element.attr('disabled', true);
                };

                var updateElement = function(){
                    updateMessage();
                    updateStatus();
                };

                updateElement();

                $attrs.$observe('enabled', function(value){
                    enabled = value == 'true';
                    updateElement();
                });

                $attrs.$observe('processing', function(value){
                    processing = value == 'true';
                    updateElement();
                });
            }]
        };
    }]);
    //

    app.directive('klFilesize', [function () {
        function formatBytes(bytes,decimals) {
            if(bytes == 0) return '0 Byte';
            var k = 1000;
            var dm = decimals + 1 || 3;
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            var i = Math.floor(Math.log(bytes) / Math.log(k));
            return (bytes / Math.pow(k, i)).toPrecision(dm) + ' ' + sizes[i];
        }
        return {
            restrict: 'A',
            scope: {},
            link: function(scope, element, attrs) {
                attrs.$observe('klFilesize', function(value) {
                    return element.text(formatBytes(value,2));
                });
            }
        };
    }]);

    app.directive('klHappenedTime', [function () {

        function getDateDiff( createdAt ) {

            var now = new Date();
            var diff = now.getTime() - createdAt.getTime();

            if(diff > 86400000){
                var daysCount = Math.round(diff / 86400000 );
                if(daysCount > 1){
                    return daysCount + ' päeva tagasi';
                }
                return '1 päeva tagasi';
            }

            if(diff > 3600000){
                var hourCount = Math.round(diff / 3600000 );
                if(hourCount > 1){
                    return hourCount + ' tundi tagasi';
                }
                return '1 tund tagasi';
            }

            if(diff > 60000){
                var minCount = Math.round(diff / 60000 );
                if(minCount > 1){
                    return minCount + ' minutit tagasi';
                }
                return '1 minut tagasi';
            }
            return 'Nüüd';
        }

        return {
            restrict: 'A',
            scope: {},
            link: function(scope, element, attrs) {
                attrs.$observe('klHappenedTime', function(value) {
                    return element.text( getDateDiff(new Date(value)) );
                });
            }
        };
    }]);

});
