angular.module("assignmentSix", ['ngRoute']).config(config);

function config($routeProvider) {
    $routeProvider.when("/beers", {
        templateUrl: "templates/beers.html",
        controller: "BeersController",
        controllerAs: "beersCtrl"
    })
    $routeProvider.when("/covid", {
        templateUrl: "templates/covid.html",
        controller: "CovidController",
        controllerAs: "covidCtrl"
    })
    ;
}

