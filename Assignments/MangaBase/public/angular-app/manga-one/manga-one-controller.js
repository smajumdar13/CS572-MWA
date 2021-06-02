angular.module("mangaBase").controller("MangaController", MangaController);

function _getStarRating(stars) {
  return new Array(stars);
}

function MangaController($routeParams, DataFactory, $route) {
  const vm = this;
  let mangaId = $routeParams.id;
  DataFactory.getOneManga(mangaId)
    .then(function (manga) {
      vm.manga = manga;
    })
    .catch(function (error) {
      console.log(error);
    });

  vm.updateManga = function () {
    const editedManga = {
      title: vm.manga.title,
      rating: parseInt(vm.editedMangaRating),
      artist: vm.manga.artist,
      genre: vm.editedMangaGenre,
      publisher: vm.editedMangaPublisher,
      imprint: vm.editedMangaImprint,
      magazine: vm.editedMangaMagazine,
      demographic: vm.manga.demographic,
      releasedYear: parseInt(vm.manga.releasedYear),
      completed: vm.editedMangaCompleted,
      tvSeries: vm.manga.tvSeries,
    };
    DataFactory.partialUpdateManga(mangaId, editedManga)
      .then(function (manga) {
        console.log(manga);
      })
      .catch(function (error) {
        console.log(error);
      });
    $route.reload();
  };

  vm.deleteManga = function () {
    DataFactory.deleteManga(mangaId)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    $route.reload();
  };
}
