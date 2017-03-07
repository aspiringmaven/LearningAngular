

/*Module 3 | Service Module*/

var dashboardService = angular.module("dashboardService",[]);


//create provider
dashboardService.provider('source',function(){
	
	var logo='';
	var banner='';
	
	this.setLogo = function(logoVal) {
		logo = logoVal;
	}
	
	this.setBanner = function(bannerVal) {
		banner = bannerVal;
	}
	
	this.$get = function(){
		
		return {
			'logo':logo,
			'banner':banner
		}		
	}
	
});

//register provider

dashboardService.config(function(sourceProvider) {
	sourceProvider.setLogo('images/yellow.jpg');
	sourceProvider.setBanner('images/red.jpg');
});



dashboardService.service("Module 1",['$http',function($http) {
	var module1Collection = function(){
		
		return $http({
			method: 'GET',
			dataType: 'json',
			url: 'https://jsonplaceholder.typicode.com/users'
		}).then(function (response) {
			console.log("Service");
			console.log(response);
			return response;
		});
		
	};

		//return only in closure Singleton Object
		return {
			serviceObj:module1Collection
		}
}]);

dashboardService.service("Module 2",['$http',function($http) {
	var module2Collection = function(){
		
		return $http({
			method: 'GET',
			dataType: 'json',
			url: 'https://jsonplaceholder.typicode.com/todos'
		}).then(function (response) {
			console.log("Service");
			console.log(response);
			return response;
		});
		
	};

		//return only in closure Singleton Object
		return {
			serviceObj:module2Collection
		}
}]);


dashboardService.service("Module 3",['$http',function($http) {
	var module3Collection = function(){
		
		return $http({
			method: 'GET',
			dataType: 'json',
			url: 'https://jsonplaceholder.typicode.com/albums'
		}).then(function (response) {
			console.log("Service");
			console.log(response);
			return response;
		});
		
	};

		//return only in closure Singleton Object
		return {
			serviceObj:module3Collection
		}
}]);


dashboardService.service("Module 4",['$http',function($http) {
	var module4Collection = function(){
		
		return $http({
			method: 'GET',
			dataType: 'json',
			url: 'https://jsonplaceholder.typicode.com/posts'
		}).then(function (response) {
			console.log("Service");
			console.log(response);
			return response;
		});
		
	};

		//return only in closure Singleton Object
		return {
			serviceObj:module4Collection
		}
}]);



/*Module 2 | Factory*/

var dashboardFactory = angular.module("dashboardFactory",['dashboardService']); // pass Service into factory / Injecting Dependency


dashboardFactory.factory('factory',['$injector', function($injector){
	
	var obj = {};
	obj.findService = function(option) {
		var obj = {};
		angular.module('dashboardService')['_invokeQueue'].forEach(function(value){
			if(option == value[2][0]) {
					console.log( "found in factory "+ value[2][0]);
					obj = $injector.get(option);
					
			}
			
			});
			console.log(obj);
			return obj;
	}
	
	return obj;
	
}]);




/*Module 1 | Controller Module*/
var dashboardApp = angular.module("dashboardApp",['dashboardFactory']);

dashboardApp.value('Options',['Module 1','Module 2','Module 3','Module 4']);  // Value Injector

dashboardApp.controller('dashboardCntrl',['$scope','Options','factory',function($scope,Options,factory){
		$scope.selectedOption = "";//selected value															
		$scope.ddOptions = Options;//
		$scope.callBack = function() {
			console.log("Check selected value " + $scope.selectedOption);				
			var obj = factory.findService($scope.selectedOption);
			
			angular.forEach(obj,function(res){
				res().then(function(output){
					switch($scope.selectedOption) {
					 case 'Module 1':
					 console.log('data should populated');
						$scope.module1Result=output.data;
						break;
					case 'Module 2':
						$scope.module2Result=output.data;
						break;
					case 'Module 3':
						$scope.module3Result=output.data;
						break;
					case 'Module 4':
						$scope.module4Result=output.data;
						break;
					
					}
					
				});
			});
			
			}


}]);


//return template and restrivtion
dashboardApp.directive('niitLogo',['source',function(source){
	return {
		restriction:"E",
		template:"<img src='"+source.logo+"'></img>"
	}
}]);

//return template and restrivtion
dashboardApp.directive('niitBanner',['source',function(source){
	return {
		restriction:"E",
		template:"<img src='"+source.banner+"'></img>"
	}
}]);