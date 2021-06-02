angular.module("jobSearch").factory("LocationDataFactory", LocationDataFactory);

function LocationDataFactory($http) {
    return {
        getLocation: getLocation,
        addLocation: addLocation,
        replaceLocation: replaceLocation,
        deleteLocation: deleteLocation,
    };
    function getLocation(jobId) {
        return $http.get("/api/jobs/" + jobId + "/location").then(complete).catch(failed);
    }
    function addLocation(jobId, location) {
        return $http.post("/api/jobs" + jobId + "/location", location).then(complete).catch(failed);
    }
    function replaceLocation(jobId, location) {
        return $http
            .put("/api/jobs/" + jobId + "/location", location)
            .then(complete)
            .catch(failed);
    }
    function deleteLocation(jobId) {
        return $http
            .delete("/api/jobs/" + jobId + "/location")
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
