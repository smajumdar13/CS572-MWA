angular.module("mangaBase").controller("MangasController", MangasController);

function MangasController(DataFactory){
    const vm = this;
    DataFactory.getAllMangas().then(function(response){
        vm.mangas = response;
    });

    vm.addManga = function () {
        const newManga = {
          title: vm.newMangaTitle,
          price: vm.newMangaPrice,
          rate: vm.newMangaRating,
          year: vm.newMangaYear,
          minPlayers: vm.newMangaMinPlayers,
          maxPlayers: vm.newMangaMaxPlayers,
          minAge: vm.newMangaMinAge,
          designer: vm.newMangaDesigner,
        };
        if (vm.mangaForm.$valid) {
          console.log(newManga);
          GameDataFactory.addOneGame(newManga)
            .then(function (response) {
              console.log("Manga saved");
              return response.data;
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      };
}