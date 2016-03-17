module.exports = 'angularBrowserify.app';

require('angular');

angular.module('angularBrowserify.app', [
    require('modules/testModule'),
    require('common/commonModule'),
    require('angular-route'),
    ]).
    service('testService', ['$route', 'testModuleService', 'BROWSERIFY', function($route, testModuleService, BROWSERIFY){
        return {
            test : function() {
                console.debug(testModuleService.callMe(BROWSERIFY));
                if($route){
                    console.debug('have $route');
                }
            }
        };
    }]).
    factory('testFactory', [function(){
        return {
            method:function(){

            }
        };
    }]);
