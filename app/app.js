// MODELE
var app = angular.module('searchApp',['ui.router','ngResource']);

// ROUTES
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {

		$stateProvider
		.state('root', {
			url: '/',
			views: {
				'' : {
					templateUrl: 'app/layout/template.html',
					'abstract': true,
					controller: 'MainController'
				}
			}
		})

		.state('root.youtube',{
			url: 'youtube/:searchParam',
			views: {
				'tab1@root': {
					templateUrl: 'app/views/youtube.html',
					controller: 'YoutubeController'
				}
			}
		})
		
		.state('root.googleImgs',{
			url: 'google-images/:searchParam',
			views: {
				'tab2@root': {
					templateUrl: 'app/views/google-images.html',
					controller: 'GoogleImgController'
				}
			}
		});

		$urlRouterProvider
			.otherwise('/');

}]);

app.run(['$rootScope','$state', function($rootScope,$state) {
	$rootScope.$state = $state;
}]);

// CONTROLLERS
app.controller('MainController',['$scope','$resource', '$state','$stateParams',
	function ($scope,$resource,$state,$stateParams) {

		$scope.mysearch = {searchInp: $state.params.searchParam};
		$scope.isFirstSearch = true;

		// Do Search
		$scope.doSearch = function() {
			if ($state.is('root.googleImgs')) {
				$state.go('root.googleImgs',{
					searchParam: $scope.mysearch.searchInp
				});
			} else {
				$state.go('root.youtube',{
					searchParam: $scope.mysearch.searchInp
				});
			}
		}

		// Hide intro section
		$scope.hideIntroSection = function() {
			return $scope.isFirstSearch = false;
		}

		if ($state.params.searchParam && $state.params.searchParam != '') {
			$scope.doSearch();
			$scope.hideIntroSection();
		}
}]);

app.controller('YoutubeController',['$scope','$resource', '$state','$stateParams',
	function($scope, $resource, $state,$stateParams) {

		$scope.youtubeAPI = $resource('https://www.googleapis.com/youtube/v3/search', 
			{callback: "JSON_CALLBACK"},
			{get: {method: "JSONP"}}		
		);

		$scope.youtubeResults = $scope.youtubeAPI.get({
			q: $scope.mysearch.searchInp,
			maxResults: '24',
			part: 'snippet',
			key: 'AIzaSyDf0EMtHzoSYu-A7Nth0X0BGc_T6mna-u8',
			type: 'video'
		})

}]);

app.controller('GoogleImgController',['$scope', '$resource','$state','$stateParams',
	function($scope,$resource, $state,$stateParams) {

		$scope.googleImageAPI = $resource('https://www.googleapis.com/customsearch/v1', 
			{callback: "JSON_CALLBACK"},
			{get: {method: "JSONP"}}		
		);

		$scope.googleImgResults = $scope.googleImageAPI.get({
			q: $scope.mysearch.searchInp,
			cx: '016409755638218649708:pwgyw7rc9cm',
			key: 'AIzaSyDf0EMtHzoSYu-A7Nth0X0BGc_T6mna-u8',
			searchType: 'image'
		});
                                                                                                                                                                                       
}]);