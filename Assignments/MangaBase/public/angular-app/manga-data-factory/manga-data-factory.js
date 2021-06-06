angular.module("mangaBase").factory("MangaDataFactory", MangaDataFactory);

function MangaDataFactory($http) {
    return {
        getAllManga: getAllManga,
        getOneManga: getOneManga,
        addOneManga: addOneManga,
        replaceOneManga: replaceOneManga,
        // previousPage: previousPage,
        // nextPage: nextPage
    }

    function getAllManga() {
        return $http.get("/api/manga").then(complete).catch(failed);
    }

    function getOneManga(id) {
        return $http.get("/api/manga/" + id).then(complete).catch(failed);

    }

    function addOneManga(manga) {
        return $http.post("/api/manga/", manga).then(complete).catch(failed);
    }

    function replaceOneManga(mangaId, manga) {
        return $http.put("/api/manga/" + mangaId, manga).then(complete).catch(failed);
    }

    // function previousPage() {
    //     if (offset >= 10) offset = offset - 10;
    //     else offset = 0;
    //     return $http.get("/api/manga/?offset=" + offset).then(complete).catch(failed);
    // }

    // function nextPage() {
    //     offset = offset + 10;
    //     return $http.get("/api/manga/?offset=" + offset).then(complete).catch(failed);
    // }

    function complete(response) {
        return response.data;
    }

    function failed(error) {
        return error.status.statusText;
    }
}