DIRECTIVES
app.directive("tabElement", function(){ 
	return {
		restrict: 'E',
		templateUrl: 'app/sections/tab-element.html',
		replace: true
	}
});