angular.module("mangaBase").controller("MangasController", MangasController);

function MangasController(DataFactory) {
  const vm = this;
  DataFactory.getAllMangas().then(function (response) {
    vm.mangas = response;
  });

  vm.addManga = function () {
    const newManga = {
      title: vm.newMangaTitle,
      releasedYear: vm.newMangaReleasedYear,
      completedYear: vm.newMangaCompletedYear,
      rating: vm.newMangaRating,
      totalChapters: vm.newMangaTotalChapters,
      artists: vm.newMangaArtists,
      // publicationName: vm.newMangaPublication.name,
      // publicationAddress: vm.newMangaPublication.address
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
    }
  };
}
