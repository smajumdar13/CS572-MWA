angular.module("mangaBase").controller("MangasController", MangasController);

function MangasController(MangaDataFactory, AuthFactory, $route) {
    const vm = this;
    vm.title = "MangaBase Application";
    // vm.isSubmitted=false;
    MangaDataFactory.getAllManga().then(function (response) {
        vm.manga = response;
    }).catch(function (error) {
        console.log(error);
    });

    vm.isLoggedIn = function () {
        return AuthFactory.auth.isLoggedIn;
        // if(AuthFactory.auth.isLoggedIn){
        //     return true;
        // }else{
        //     return false;
        // }
    };

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
            tvSeries: vm.newMangaTvseries
        };
        if (vm.mangaForm.$valid) {
            console.log(newManga);
            MangaDataFactory.addOneManga(newManga).then(function (response) {
                console.log("Manga saved");
                return response.data;
            }).catch(function (error) {
                console.log(error);
            });
            $route.reload();
        };
    };

    // vm.previous = function () {
    //     MangaDataFactory.previousPage().then(function (response) {
    //         console.log("Previous page");
    //         vm.mangas = response;
    //     }).catch(function (error) {
    //         console.log(error);
    //     });
    // };

    // vm.next = function () {
    //     MangaDataFactory.nextPage().then(function (response) {
    //         console.log("Next page");
    //         vm.mangas = response;
    //     }).catch(function (error) {
    //         console.log(error);
    //     });
    // };

}

