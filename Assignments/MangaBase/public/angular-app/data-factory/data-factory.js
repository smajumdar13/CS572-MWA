angular.module("mangaBase").factory("DataFactory", DataFactory)

function DataFactory($http) {
    return {
        getAllMangas: getAllMangas,
        getOneManga: getOneManga
    };
    function getAllMangas(){
        return $http.get("/api/manga").then(complete).catch(failed);
    };
    function getOneManga(id) {
        return $http.get("/api/manga/" + id).then(complete).catch(failed);
    };
    function complete(response){
        console.log(response.data);
        return response.data;
    };
    function failed(error){
        return error.status.statusText;
    }
}