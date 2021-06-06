angular.module("mangaBase").factory("DataFactory", DataFactory);

function DataFactory($http) {
  return {
    getAllMangas: getAllMangas,
    getOneManga: getOneManga,
    addManga: addManga,
    partialUpdateManga: partialUpdateManga,
    deleteManga: deleteManga,

    // getAllReviews: getAllReviews,
    // getOneReview: getOneReview,
    // addReview: addReview,
    // partialUpdateReview: partialUpdateReview,
    // deleteReview: deleteReview
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
  function addManga(manga) {
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
  // function getAllReviews(id) {
  //   return $http.get("/api/manga/" + id + "/reviews").then(complete).catch(failed);
  // }
  // function getOneReview(id, reviewId) {
  //   return $http
  //     .get("/api/manga/" + id + "/reviews/" + reviewId)
  //     .then(complete)
  //     .catch(failed);
  // }
  // function addReview(id, review) {
  //   return $http.post("/api/manga" + id + "/reviews", review).then(complete).catch(failed);
  // }
  // function partialUpdateReview(id, reviewId, review) {
  //   return $http
  //     .put("/api/manga/" + id + "/reviews/" + reviewId, review)
  //     .then(complete)
  //     .catch(failed);
  // }
  // function deleteReview(id, reviewId) {
  //   return $http
  //     .delete("/api/manga/" + id + "/reviews/" + reviewId)
  //     .then(complete)
  //     .catch(failed);
  // }
  function complete(response) {
    console.log(response.data);
    return response.data;
  }
  function failed(error) {
    return error.status.statusText;
  }
}
