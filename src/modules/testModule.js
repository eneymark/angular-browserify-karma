module.exports = 'angularBrowserify.app.modules.testModule';

angular.module('angularBrowserify.app.modules.testModule', []).
    service('testModuleService', function(){
        this.callMe = function(test){
            return test ? '415' : '000';
        };
    })