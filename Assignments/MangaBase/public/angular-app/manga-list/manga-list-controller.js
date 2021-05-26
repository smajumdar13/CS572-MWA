angular.module("mangaBase").controller("MangasController", MangasController);

function MangasController(DataFactory){
    const vm = this;
    DataFactory.getAllMangas().then(function(response){
        vm.mangas = response;
    });
}