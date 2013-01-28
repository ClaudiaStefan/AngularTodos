contactsCtrl = function($scope) {
	$scope.contacts=[{name: 'ana'}, {name: 'maria'}];

	$scope.addContact = function() {
		$scope.contacts.push({name: $scope.contactName});
		$scope.contactName = '';
	}
	$scope.delete = function() {
		console.log(this.contacts);

	
	}

}