// angular.module("myProperApp", []);

angular.module("myProperApp", ['ngRoute']).config(config);

function config($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "main/main.html",
        controller: "MainController",
        controllerAs: "mainCtrl"
    })
    .when("/about", {
        templateUrl: "about/about.html",
        controller: "AboutController",
        controllerAs: "aboutCtrl"
    })
    .when("/joke/:jokeType", {
        templateUrl: "joke/joke.html",
        controller: "JokeController",
        controllerAs: "jokeCtrl"
    });
}

