angular.module("assignmentSix").controller("CovidController", CovidController);

function CovidController($http){
    let vm = this;
    $http.get("https://disease.sh/v3/covid-19/all").then(function(response){
        vm.covid = response.data;
    });
}
