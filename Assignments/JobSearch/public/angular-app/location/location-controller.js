angular.module("jobSearch").controller("LocationController", LocationController);

function LocationController(LocationDataFactory, JobDataFactory, $routeParams, $route, $location) {
    const vm = this;
    const jobId = $routeParams.jobId;
    const locationId = $routeParams.locationId;

    LocationDataFactory.getLocation(jobId).then(function (response) {
        const location = response;
        vm.job.location = location;
        vm.locationCity = location.city;
        vm.locationState = location.state;
        vm.locationZip = location.zip;

    }).catch(function (error) {
        console.log(error);
    });

    vm.addLocation = function () {
        const newLocation = {
            city: vm.city,
            state: vm.state,
            zip: vm.zip
        };
        if (vm.locationForm.$valid) {
            console.log(newLocation);
            LocationDataFactory.addLocation(newLocation)
                .then(function (response) {
                    console.log("Location saved");
                    return response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        $route.reload();
    };

    vm.updateLocation = function () {
        const editedLocation = {
            city: vm.editedJobCity,
            state: vm.editedJobState,
            zip: vm.editedJobZip
        }

        JobDataFactory.replaceJobLocation(jobId, editedLocation).then(function (response) {
            console.log(response);
            // $location.path("/job/" + jobId + "/location");
        })
            .catch(function (error) {
                console.log(error);
            });

    };
    vm.deleteLocation = function () {
        LocationDataFactory.deleteLocation(jobId)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        // $route.reload();
        // $location.path("/");
    };

}