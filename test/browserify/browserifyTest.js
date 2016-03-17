describe('browserify modules dependency test', function(){
    /**
     * here we will be replacing the name of the module with each filename we get in grunt task
     */
    var moduleName = require('@@toBeReplacedModuleName@@');

    beforeEach(function(){
        angular.mock.module(moduleName);
    });

    it(moduleName + ' should load all its dependencies', inject(function($injector, $rootScope, $controller, $compile) {
        var testedModule = angular.module(moduleName);

        testedModule._invokeQueue.forEach(function(value){
          //check what we have, a service or factory, then get it from injector
          if(value[1] === 'service' || value[1] === 'factory'){
               var serviceName = value[2][0];
               var service = $injector.get(serviceName);
               expect(service).toBeDefined();
           }
          //its a controller, different approach to invoke it
           else if(value[1] === 'controller'){
               var controllerName = value[2][0];
               var controller = $controller(controllerName);
               expect(controller).toBeDefined();
           }
           else if(value[1] === 'directive'){
               var directiveName = value[2][0].replace(/\.?([A-Z])/g, function (x,y){return '-' + y.toLowerCase()}).replace(/^-/, '');
               $compile(angular.element('<' + directiveName +'><div ' + directiveName +'/></' + directiveName + '>'))($rootScope.$new());
           }
        });
    }));
});