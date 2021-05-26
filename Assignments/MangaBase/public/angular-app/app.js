angular.module("mangaBase", ["ngRoute"]).config(config);

function config($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider.when("/", {
        templateUrl: "angular-app/manga-list/manga-list.html",
        controller: "MangasController",
        controllerAs: "vm"
    }).when("/manga/:id", {
        templateUrl: "angular-app/manga-one/manga-one.html",
        controller: "MangaController",
        controllerAs: "vm"
    });
}