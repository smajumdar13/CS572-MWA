angular.module("meanGames", ["ngRoute"]).config(config);

function config($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    .when("/", {
      templateUrl: "angular-app/welcome/welcome.html",
    })
    .when("/games", {
      templateUrl: "angular-app/game-list/game-list.html",
      controller: "GamesController",
      controllerAs: "vm",
    })
    .when("/register", {
      templateUrl: "angular-app/register/register.html",
      controller: "RegisterController",
      controllerAs: "vm",
    })
    .when("/game/:gameId", {
      templateUrl: "angular-app/game-one/game-one.html",
      controller: "GameController",
      controllerAs: "vm",
    })
    .otherwise({
      redirectTo: "/",
    });
}
