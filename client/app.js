var myApp = angular.module('Myapp', ['ngRoute']);


(function(){
	myApp.config(function($routeProvider){
		$routeProvider
			.when('/', 
			{
				controller: 'indexController',
				templateUrl: "partials/index.html"
			})
            .when('/analytics',
            {
                controller: 'analyticsController',
                templateUrl: "partials/analytics.html"
            })
	})
}());