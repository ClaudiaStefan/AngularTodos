function TodosCtrl($scope)
{   "use strict";
    /*global angular:false*/
    $scope.todos = JSON.parse(localStorage.getItem('toDoList'));
    if($scope.todos === null) {
        $scope.checked = true; 
    }
    $scope.orderProp = 'age';
    $scope.edit = false;
    $scope.currentTodo = ""; 
    $scope.addTodo = function() {
        var ages;
        if($scope.todos === null) {
            ages = 0;
            $scope.checked = false;
            $scope.todos = [{text:$scope.todoText, time:$scope.todoTime,  age:ages + 1, details:"", done: false}];
        } else if($scope.edit === true){
            $scope.currentTodo.text = $scope.todoText;
            $scope.currentTodo.time = $scope.todoTime;
            $scope.checked = false;
        } else {
            ages = $scope.todos.length;
            $scope.todos.push({text:$scope.todoText, time:$scope.todoTime,  age:ages + 1, details:"", done: false});
            $scope.checked = false;
        }     
        $scope.todoText = '';
        $scope.todoTime = '';
        
    };
    $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.todos, function(todo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    };

    $scope.deleteTodo = function() {
        this.todos.splice(this.todos.indexOf(this.todo),1);
        localStorage.setItem('toDoList',JSON.stringify($scope.todos));
    };
    $scope.saveTodoList = function() {
        localStorage.setItem('toDoList',JSON.stringify($scope.todos));
    };
    $scope.selected = function() {
        return true;
    };
    $scope.showAdd = function() {
        $scope.checked = true;
    };
    
    $scope.editTodo = function() {
        $scope.currentTodo = this.todo;
        $scope.checked = true;
        $scope.todoText = $scope.currentTodo.text;
        $scope.todoTime = $scope.currentTodo.time;
        $scope.edit = true;
    };
    $scope.deleteAll = function() {
        localStorage.clear();
        $scope.todos = JSON.parse(localStorage.getItem('toDoList'));
        $scope.checked = true;
    };

   
}

function TodoItemCtrl($scope, $routeParams) {
    "use strict";
    $scope.todos = JSON.parse(localStorage.getItem('toDoList'));
    $scope.itemId = $routeParams.todoId;
    $scope.todoText = $scope.todos[$scope.itemId].text;
    
    if($scope.todos[$scope.itemId].details === "") {
        $scope.taskDetails = "Add more details here...";
    } else {
        $scope.taskDetails = $scope.todos[$scope.itemId].details;
    }

    $scope.addTaskDetail = function() {
        $scope.todos[$scope.itemId].details = $scope.taskDetails;
        localStorage.setItem('toDoList',JSON.stringify($scope.todos));
    };

}
