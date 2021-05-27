angular.module("mangaBase").factory("DataFactory", DataFactory);

function DataFactory($http) {
  return {
    getAllMangas: getAllMangas,
    getOneManga: getOneManga,
    addOneManga: addOneManga,
    partialUpdateManga: partialUpdateManga,
    deleteManga: deleteManga,
  };
  function getAllMangas() {
    return $http.get("/api/manga").then(complete).catch(failed);
  }
  function getOneManga(id) {
    return $http
      .get("/api/manga/" + id)
      .then(complete)
      .catch(failed);
  }
  function addOneManga(manga) {
    return $http.post("/api/manga", manga).then(complete).catch(failed);
  }
  function partialUpdateManga(id, manga) {
    return $http
      .put("/api/manga/" + id, manga)
      .then(complete)
      .catch(failed);
  }
  function deleteManga(id) {
    return $http
      .delete("/api/manga/" + id)
      .then(complete)
      .catch(failed);
  }
  function complete(response) {
    console.log(response.data);
    return response.data;
  }
  function failed(error) {
    return error.status.statusText;
  }
}
