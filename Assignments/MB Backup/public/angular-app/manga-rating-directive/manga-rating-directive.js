angular.module("mangaBase").directive("mangaRating", MangaRating);

function MangaRating(){
    return {
        restrict:"E", //E for Element or A for Attribute
        templateUrl:"angular-app/manga-rating-directive/rating.html",
        bindToController:true,
        controller:"MangaController",
        controllerAs:"vm",
        scope:{
            stars:"@"
        }
    }
}