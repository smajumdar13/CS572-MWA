angular.module("mangaBase").controller("MangaController", MangaController);

function MangaController($routeParams, DataFactory){
    const vm = this;
    let mangaId = $routeParams.id;
    DataFactory.getOneManga(mangaId).then(function(response){
        vm.manga = response;
    });
}