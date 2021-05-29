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
      vm.rating = _getStarRating(vm.manga.rate);
      //   vm.editedMangaReleasedYear = vm.manga.releasedYear;
      vm.editedMangaTotalChapters = vm.manga.totalChapters;
      //   vm.editedMangaPublication = vm.manga.publication;
    })
    .catch(function (error) {
      console.log(error);
    });

  vm.updateManga = function () {
    const editedManga = {
      title: vm.manga.title,
      releasedYear: vm.manga.releasedYear,
      completedYear: vm.manga.completedYear,
      rating: vm.manga.rating,
      totalChapters: vm.editedMangaTotalChapters,
      publication: vm.manga.publication,
      releases: vm.manga.releases,
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
    MangaDataFactory.deleteManga(mangaId)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    $route.reload("/api/manga");
  };
}
