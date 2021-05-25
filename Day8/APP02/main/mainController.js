angular.module("myProperApp").controller("MainController", MainController);

// function MainController($http){
//     let vm = this;
//     vm.name = "Jack";
//     $http.get("https://official-joke-api.appspot.com/jokes/ten").then(function(response){
//         vm.jokes = response.data;
//     });
// }

function MainController(JokeFactory){
    let vm = this;
    vm.name = "Jack";
    JokeFactory.getTenJokes().then(function(factoryResponse){
        vm.jokes = factoryResponse;
    })
}