angular.module("jobSearch").controller("JobsController", JobsController);

function JobsController(JobDataFactory, $route) {
  const vm = this;
  vm.title = "Job Search App";
  JobDataFactory.getAllJobs().then(function (response) {
    vm.jobs = response;
  });

  vm.addJob = function () {
    const newJob = {
      title: vm.newJobTitle,
      description: vm.newJobDescription,
      experience: vm.newJobExperience,
      skills: vm.newJobSkills,
      salary: vm.newJobSalary,
      postDate: vm.newJobPostDate
    };
    if (vm.jobForm.$valid) {
      console.log(newJob);
      JobDataFactory.addOneJob(newJob)
        .then(function (response) {
          console.log("Job saved");
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    $route.reload();
  };
}
