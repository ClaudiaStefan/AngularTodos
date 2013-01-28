function TodosCtrl($scope){
    $scope.todos = JSON.parse(localStorage.getItem('toDoList'));
    $scope.orderProp='age';    
    $scope.addTodo = function() {
        var ages;
        if($scope.todos === null ) {
            ages = 0;
            $scope.todos = [{text:$scope.todoText, time:$scope.todoTime,  age:ages + 1 ,done: false}];
        } else {
            ages = $scope.todos.length;
            $scope.todos.push({text:$scope.todoText,time:$scope.todoTime,  age:ages + 1 ,done: false});
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
    $scope.archive = function() {
        var oldTodos = $scope.todos;
        $scope.todos = [];
        angular.forEach(oldTodos, function(todo) {
            if (!todo.done) $scope.todos.push(todo);
        });
    };
    $scope.deleteTodo = function() {
        this.todos.splice(this.todos.indexOf(this.todo),1);
        localStorage.setItem('toDoList',JSON.stringify($scope.todos));
    }
    $scope.saveTodoList = function() {
        localStorage.setItem('toDoList',JSON.stringify($scope.todos));
    }
    $scope.selected = function() {
        return true;
    }
    $scope.showAdd = function() {
        $scope.checked = true;
    }
    $scope.editTodo = function() {
        alert("Edit");
    }
   
}
