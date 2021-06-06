angular.module("mangaBase").directive("mangaNavigation", MangaNavigation);

function MangaNavigation() {
    return {
        restrict: "E",
        templateUrl: "angular-app/navigation-directive/navigation-directive.html"
    }
}