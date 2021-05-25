angular.module("assignmentSix").controller("JokesController", JokesController);

function JokesController($http){
    let vm = this;
    $http.get("https://official-joke-api.appspot.com/jokes/ten").then(function(response){
        vm.jokes = response.data;
    });
}
