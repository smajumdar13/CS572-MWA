angular.module("mangaBase").directive("mangaRating", MangaRating);

function MangaRating() {
  return {
    restrict: "E",
    templateUrl: "angular-app/manga-rating-directive/rating.html",
    bindToController: true,
    controller: "MangaController",
    controllerAs: "vm",
    scope: {
      starts: "@",
    },
  };
}
