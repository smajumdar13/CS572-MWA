angular.module("mangaBase").controller("MangasController", MangasController);

function MangasController(DataFactory){
    const vm = this;
    // vm.title = "Manga Base";
    DataFactory.getAllMangas().then(function(response){
        vm.mangas = response;
    });
}