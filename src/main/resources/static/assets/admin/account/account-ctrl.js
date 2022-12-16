app.controller("account-ctrl", function($scope, $http) {
	$scope.items = [];
	$scope.account = [];
	$scope.form = {};
	$scope.roles = [];
	$scope.form.account = [];
	// Get all item from database
	$scope.initialize = function() {

		// load authorit
		$http.get("/rest/authorities").then(resp => {
			$scope.items = resp.data;

		})

		// load account
		$http.get("/rest/accounts").then(resp => {
			$scope.account = resp.data;

		})

		// load categories
		$http.get("/rest/roles").then(resp => {
			$scope.roles = resp.data;


		});

	}

	$scope.initialize();

	$scope.edit = function(item) {
		$scope.form = angular.copy(item);
		$(".nav-tabs a:eq(0)").tab('show');
	}
	
	$scope.edit_author = function(item) {
		$scope.form = angular.copy(item);
		$(".nav-tabs a:eq(2)").tab('show');
	}
	
	$scope.edit_acc = function(item) {
		$scope.form.account = angular.copy(item);
		$(".nav-tabs a:eq(2)").tab('show');
	}
	
	// reset form
	$scope.reset = function() {

		$scope.form = {

			photo: 'cloud-upload.jpg'
			
		}
	}

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
	
	// authority
	$scope.save = function()
	{
		var item = angular.copy($scope.form);
		$http.post('/rest/authorities/', item).then(resp => {
			$scope.items.push(resp.data);
			$scope.reset();
			alert("Add success");
		}).catch(error => {
			alert("Add fail");
			console.log("Error", error);
		})

	}
	
	// delete authority
	$scope.delete_auth = function(item) {

		$http.delete(`/rest/authorities/${item.id}`).then(resp => {

			var index = $scope.items.findIndex(p => p.id == item.id);
			$scope.items.splice(index, 1);
			$scope.reset();
			alert("Delete Success");
		}).catch(error => {
			alert("Delete fail");
			console.log("Eroor", error);
			alert(item.id);
		});
	}

	// delete account
	$scope.delete = function(item) {

		$http.delete(`/rest/accounts/${item.username}`).then(resp => {

			var index = $scope.items.findIndex(p => p.id == item.username);
			$scope.account.splice(index, 1);
			$scope.reset();
			alert("Delete Success");
		}).catch(error => {
			alert("Delete fail");
			console.log("Eroor", error);
			alert(item.id);
		});
	}
	
	// update account
	$scope.update = function() {

		var item = angular.copy($scope.form);
		$http.put(`/rest/accounts/${item.username}`, item).then(resp => {
			var index = $scope.account.findIndex(p => p.id == item.username);
			$scope.items[index] = item;
			
			alert("Update success");
		}).catch(error => {
			alert("Update fail");
			console.log("Error", error);
		});
	}
	
	// get image
	$scope.imageChanged = function(files) {
		
		var data = new FormData();
		data.append('file', files[0]);
		$http.post('/rest/upload/images', data, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined}
		}).then(resp => {
			$scope.form.photo = resp.data.name;
		}).catch(error => {
			alert("Imgae error");
			console.log("Error", error);
		});
	}

	// account
	$scope.pager = {
		page: 0,
		size: 8,
		get account() {
			var start = this.page * this.size;
			return $scope.account.slice(start, start + this.size);
		},
		get count() {
			return Math.ceil(1.0 * $scope.account.length / this.size);
		},
		first() {
			this.page = 0;
		},
		prev() {
			this.page--;
			if (this.page < 0) {
				this.last()
			}
		},
		next() {
			this.page++;
			if (this.page >= this.count) {
				this.first();
			}
		},
		last() {
			this.page = this.count - 1;
		}
	}
	
	//authority
	$scope.page = {
		pages: 0,
		size: 8,
		get items() {
			var start = this.pages * this.size;
			return $scope.items.slice(start, start + this.size);
		},
		get count() {
			return Math.ceil(1.0 * $scope.items.length / this.size);
		},
		first() {
			this.pages = 0;
		},
		prev() {
			this.pages--;
			if (this.pages < 0) {
				this.last()
			}
		},
		next() {
			this.pages++;
			if (this.pages >= this.count) {
				this.first();
			}
		},
		last() {
			this.pages = this.count - 1;
		}
	}
});