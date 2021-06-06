angular.module("mangaBase").controller("MangaController", MangaController);

function _getStarRating(stars) {
  return new Array(stars);
}

function MangaController($routeParams, DataFactory, $route, AuthFactory) {
  const vm = this;
  const mangaId = $routeParams.id;
  DataFactory.getOneManga(mangaId)
    .then(function (manga) {
      vm.manga = manga;
      vm.rating = _getStarRating(vm.manga.rating);
      vm.editedMangaGenre = vm.manga.genre;
      vm.editedMangaPublisher = vm.manga.publisher;
      vm.editedMangaImprint = vm.manga.imprint;
      vm.editedMangaMagazine = vm.manga.magazine;
      vm.demographic = vm.manga.demographic;
      vm.releasedYear = vm.manga.releasedYear;
      vm.completed = vm.manga.completed;
      vm.tvSeries = vm.manga.tvSeries;
    }).catch(function (error) {
      console.log(error);
    });

  vm.isLoggedIn = function () {
    return AuthFactory.auth.isLoggedIn;
  };

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
