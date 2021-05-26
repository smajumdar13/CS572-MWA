angular.module("myProperApp").factory("JokeFactory", JokeFactory);

function JokeFactory($http) {
    return {
        getTenJokes: getTenJokes,
        getOneJoke: getOneJoke
    };
    function getTenJokes() {
        return $http.get("https://official-joke-api.appspot.com/jokes/ten")
        .then(complete).catch(failed);
    }
    function getOneJoke(jokeType) {
        return $http.get("https://official-joke-api.appspot.com/jokes/" + jokeType + "/random")
        .then(complete).catch(failed);
    }
    function complete(httpResponse){
        return httpResponse.data;
    }
    function failed(error){
        return error.statusText;
    }
}