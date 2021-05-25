angular.module("assignmentSix", ['ngRoute']).config(config);

function config($routeProvider) {
    $routeProvider.when("/jokes", {
        templateUrl: "templates/jokes.html",
        controller: "JokesController",
        controllerAs: "jokesCtrl"
    })
    $routeProvider.when("/covid", {
        templateUrl: "templates/covid.html",
        controller: "CovidController",
        controllerAs: "covidCtrl"
    })
    ;
}

