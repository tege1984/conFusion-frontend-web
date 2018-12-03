'use strict';

/**
 * @ngdoc function
 * @name yoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yoApp
 */
angular.module('yoApp')
  .controller('MainCtrl', function ($scope,localStorageService) {
    var todosInStore = localStorageService.get('todos');

     $scope.todos = todosInStore || [];

     $scope.$watch('todos', function () {
       localStorageService.set('todos', $scope.todos);
     }, true);

    $scope.addTodo = function () {
        $scope.todos.push($scope.todo);
        $scope.todo = '';
    };
    $scope.removeTodo = function (index) {
       $scope.todos.splice(index, 1);
    };
  });
