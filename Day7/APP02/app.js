// angular.module("myProperApp", []);

angular.module("myProperApp", ['ngRoute']).config(config);

function config($routeProvider) {
    $routeProvider.when("/", {
        // template: "<h1>This is the home page. </h1>"
        templateUrl: "templates/main.html",
        controller: "MainController",
        controllerAs: "mainCtrl"
    }).when("/about", {
        // template: "<h1> This is the about page. </h1>"
        templateUrl: "templates/about.html",
        controller: "AboutController",
        controllerAs: "aboutCtrl"
    });
}

