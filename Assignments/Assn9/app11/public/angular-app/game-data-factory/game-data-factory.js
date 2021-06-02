angular.module("meanGames").factory("GameDataFactory", GameDataFactory);

function GameDataFactory($http) {
    return {
        getAllGames: getAllGames,
        getOneGame: getOneGame,
        addOneGame: addOneGame,
        replaceOneGame: replaceOneGame,
        previousPage: previousPage,
        nextPage: nextPage
    }

    function getAllGames() {
        return $http.get("/api/games").then(complete).catch(failed);
    }

    function getOneGame(id) {
        return $http.get("/api/games/" + id).then(complete).catch(failed);

    }

    function addOneGame(game) {
        return $http.post("/api/games/", game).then(complete).catch(failed);
    }

    function replaceOneGame(gameId, game) {
        return $http.put("/api/games/" + gameId, game).then(complete).catch(failed);
    }

    function previousPage() {
        if (offset >= 10) offset = offset - 10;
        else offset = 0;
        return $http.get("/api/games/?offset=" + offset).then(complete).catch(failed);
    }

    function nextPage() {
        offset = offset + 10;
        return $http.get("/api/games/?offset=" + offset).then(complete).catch(failed);
    }

    function complete(response) {
        return response.data;
    }

    function failed(error) {
        return error.status.statusText;
    }
}