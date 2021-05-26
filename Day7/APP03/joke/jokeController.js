angular.module("myProperApp").controller("JokeController", JokeController);

// function JokeController($http, $routeParams){
//     let vm = this;
//     let jokeType = $routeParams.jokeType;
//     console.log("In joke controller", jokeType);
//     $http.get("https://official-joke-api.appspot.com/jokes/" + jokeType + "/random") // /ten
//     .then(function(response){
//         vm.joke = response.data;
//     });
// }

function JokeController(JokeFactory, $routeParams){
    let vm = this;
    let jokeType = $routeParams.jokeType;
    JokeFactory.getOneJoke(jokeType).then(function(response){
            vm.joke = response[0];
    })
}