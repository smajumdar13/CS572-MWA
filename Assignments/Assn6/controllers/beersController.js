angular.module("assignmentSix").controller("BeersController", BeersController);

function BeersController($http){
    let vm = this;
    $http.get("https://api.punkapi.com/v2/beers?page=1&per_page=30").then(function(response){
        vm.beers = response.data;
    });
}
