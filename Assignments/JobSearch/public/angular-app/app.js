angular.module("jobSearch", ["ngRoute"]).config(config);

function config($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    .when("/", {
      templateUrl: "angular-app/job-list/job-list.html",
      controller: "JobsController",
      controllerAs: "vm",
    })
    .when("/job/:jobId", {
      templateUrl: "angular-app/job-one/job-one.html",
      controller: "JobController",
      controllerAs: "vm",
    });
}
