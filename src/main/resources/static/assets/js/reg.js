app.controller("resign-ctrl", function($scope, $http) {
	$scope.items = [];
	$scope.account = [];
	$scope.form = {};
	

	// Get all item from database
	$scope.initialize = function() {

	

		// load account
		$http.get("/rest/accounts").then(resp => {
			$scope.account = resp.data;



		});

	}

	$scope.initialize();

	

	$scope.create = function() {
		var item = angular.copy($scope.form);
		$http.post('/rest/accounts', item).then(resp => {
			$scope.account.push(resp.data);
			$scope.reset();
			alert("Add success");
		}).catch(error => {
			alert("Add fail");
			console.log("Error", error);
		})
		


	}
	
	
	
	
	// get image
	$scope.imageChanged = function(files) {
		
		var data = new FormData();
		data.append('file', files[0]);
		$http.post('/rest/upload/images', data, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined}
		}).then(resp => {
			$scope.form.image = resp.data.name;
		}).catch(error => {
			alert("Imgae error");
			console.log("Error", error);
		});
	}

	
	
	
});