angular.module("mangaBase", ["ngRoute"]).config(config);

function config($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider.when("/", {
        templateUrl: "angular-app/welcome/welcome.html",
        access: { restricted: false }
    }).when("/manga", {
        templateUrl: "angular-app/manga-list/manga-list.html",
        controller: "MangasController",
        controllerAs: "vm"
    }).when("/register", {
        templateUrl: "angular-app/register/register.html",
        controller: "RegisterController",
        controllerAs: "vm",
        access: { restricted: false }
        // }).when("/manga/:id/reviews/", {
        //     templateUrl: "angular-app/manga-list/manga-list.html",
        //     controller: "ReviewsController",
        //     controllerAs: "vm"
    }).when("/manga/:id", {
        templateUrl: "angular-app/manga-one/manga-one.html",
        controller: "MangaController",
        controllerAs: "vm"
    }).when("/profile", {
        templateUrl: "angular-app/profile/profile.html",
        access: { restricted: true }
        // }).when("/manga/:id/reviews/:reviewId", {
        //     templateUrl: "angular-app/manga-one/review-one.html",
        //     controller: "MangaController",
        //     controllerAs: "vm"
    }).otherwise({
        redirectTo: "/"
    });
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