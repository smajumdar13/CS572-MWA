angular.module("mangaBase", ['ngRoute', "angular-jwt"]).config(config).run(run);

function config($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider.when("/", {
        templateUrl: "angular-app/welcome/welcome.html",
        access: { restricted: false }
    }).when("/manga", {
        templateUrl: "angular-app/manga-list/manga-list.html",
        controller: "MangasController",
        controllerAs: "vm",
        access: { restricted: false }
    }).when("/register", {
        templateUrl: "angular-app/register/register.html",
        controller: "RegisterController",
        controllerAs: "vm",
        access: { restricted: false }
    }).when("/manga/:mangaId", {
        templateUrl: "angular-app/manga-one/manga-one.html",
        controller: "MangaController",
        controllerAs: "vm",
        access: { restricted: false }
    }).when("/profile", {
        templateUrl: "angular-app/profile/profile.html",
        access: { restricted: true }
    }).otherwise({
        redirectTo: "/"
    })

}

function run($rootScope, $location, $window, AuthFactory) {
    $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
        //This is to enable overcomming restricted URLs
        if (nextRoute.access !== undefined && nextRoute.access.restricted
            && !$window.sessionStorage.token && !AuthFactory.auth.isLoggedIn) {
            event.preventDefault();
            $location.path("/");


        }
    });

}

