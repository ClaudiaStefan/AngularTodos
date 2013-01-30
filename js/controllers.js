/**
 * Default controller that implements all tha task and the main functionalities.
 * @param {Object} $scope
 */
function TodosCtrl($scope) {
    'use strict';
    /*global angular: false, localStorage: false, console: false, $: false */
    $scope.orderProp = 'age';
    $scope.edit = false;
    $scope.currentTodo = '';
    $scope.todos = JSON.parse(localStorage.getItem('toDoList'));
    if ($scope.todos === null) {
        $scope.checked = true;
    }
    /**
     * Adds a new task or updates the task table.
     */
    $scope.addTodo = function () {
        var ages;
        if ($scope.todos === null) {
            ages = 0;
            $scope.checked = false;
            $scope.todos = [{ text: $scope.todoText,
                              time: $scope.todoTime,
                              age: ages + 1,
                              details: "",
                              done: false}];
        } else if ($scope.edit === true) {
            $scope.currentTodo.text = $scope.todoText;
            $scope.currentTodo.time = $scope.todoTime;
            $scope.checked = false;
        } else {
            ages = $scope.todos.length;
            $scope.todos.push({ text: $scope.todoText,
                                time: $scope.todoTime,
                                age: ages + 1,
                                details: "",
                                done: false});
            $scope.checked = false;
        }
        localStorage.setItem('toDoList', JSON.stringify($scope.todos));
        $scope.todoText = '';
        $scope.todoTime = '';
    };
    /**
     * Returns the number of tasks left to do.
     * @return {number} Number of tasks left.
     */
    $scope.remaining = function () {
        var count = 0;
        angular.forEach($scope.todos, function (todo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    };
    /**
     * Deletes the selected task from localStorage.
     */
    $scope.deleteTodo = function () {
        this.todos.splice(this.todos.indexOf(this.todo), 1);
        localStorage.setItem('toDoList', JSON.stringify($scope.todos));
    };
    /**
     * Saves all the tasks to localStorage.
     */
    $scope.saveTodoList = function () {
        localStorage.setItem('toDoList', JSON.stringify($scope.todos));
    };
    /**
     * Sets the default text for the select element
     * @return {bool} Returns true for the selected element
     */
    $scope.selected = function () {
        return true;
    };
    /**
     * Sets the permission to show the add form.
     */
    $scope.showAdd = function () {
        $scope.checked = true;
    };
    /**
     * Updates the task.
     */
    $scope.editTodo = function () {
        $scope.currentTodo = this.todo;
        $scope.checked = true;
        $scope.todoText = $scope.currentTodo.text;
        $scope.todoTime = $scope.currentTodo.time;
        $scope.edit = true;
    };
    /**
     * Deletes all the task from the localStorage
     */
    $scope.deleteAll = function () {
        localStorage.clear();
        $scope.todos = JSON.parse(localStorage.getItem('toDoList'));
        $scope.checked = true;
    };
}
/**
 * Shows the details for the currently selected task.
 * @param {Object} $scope
 * @param {Object} $routeParams
 */
function TodoItemCtrl($scope, $routeParams) {
    "use strict";
    /*global localStorage: false, console: false, $: false */
    $scope.todos = JSON.parse(localStorage.getItem('toDoList'));
    $scope.itemId = $routeParams.todoId;
    $scope.todoText = $scope.todos[$scope.itemId].text;

    if ($scope.todos[$scope.itemId].details === '') {
        $scope.taskDetails = 'Add more details here...';
    } else {
        $scope.taskDetails = $scope.todos[$scope.itemId].details;
    }
    /**
     * Adds to local storage the details of a task.
     */
    $scope.addTaskDetail = function () {
        $scope.todos[$scope.itemId].details = $scope.taskDetails;
        localStorage.setItem('toDoList', JSON.stringify($scope.todos));
    };
}
