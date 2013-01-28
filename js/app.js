(function () {
"use strict";
/*global angular:false*/
/*global TodosCtrl:false*/
/*global TodoItemCtrl:false*/
angular.module('todoS',[]).config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/todos', {templateUrl: '../Angular/partials/todoList.html', controller: TodosCtrl}).
    when('/todos/:todoId', {templateUrl:'../Angular/partials/todoItem.html', controller: TodoItemCtrl}).
    otherwise({redirectTo: '/todos'});
}]);
}());