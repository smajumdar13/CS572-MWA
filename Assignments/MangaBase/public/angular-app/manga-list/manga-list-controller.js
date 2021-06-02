angular.module("mangaBase").controller("MangasController", MangasController);

function MangasController(DataFactory) {
  const vm = this;
  DataFactory.getAllMangas().then(function (response) {
    vm.mangas = response;
  });

  vm.addManga = function () {
    const newManga = {
      title: vm.newMangaTitle,
      rating: parseInt(vm.newMangaRating),
      artist: vm.newMangaArtist,
      genre: vm.newMangaGenre,
      publisher: vm.newMangaPublisher,
      imprint: vm.newMangaImprint,
      magazine: vm.newMangaMagazine,
      demographic: vm.newMangaDemographic,
      releasedYear: parseInt(vm.newMangaReleasedYear),
      completed: vm.newMangaCompleted,
      tvSeries: vm.newMangaTvseries,
    };
    if (vm.mangaForm.$valid) {
      console.log(newManga);
      DataFactory.addManga(newManga)
        .then(function (response) {
          console.log("Manga saved");
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
      $route.reload();
    }
  };
}
