angular.module("jobSearch").controller("JobController", JobController);

function JobController(JobDataFactory, $routeParams, $route, $location) {
  const vm = this;
  let jobId = $routeParams.jobId;
  JobDataFactory.getOneJob(jobId)
    .then(function (job) {
      vm.job = job;
      vm.editedJobDescription = vm.job.description;
      vm.editedJobExperience = vm.job.experience;
      vm.editedJobSkills = vm.job.skills;
    })
    .catch(function (error) {
      console.log(error);
    });

  vm.updateJob = function () {
    const editedJob = {
      title: vm.job.title,
      description: vm.editedJobDescription,
      experience: vm.editedJobExperience,
      skills: vm.editedJobSkills,
      salary: vm.job.salary,
      postDate: vm.job.postDate
    };
    JobDataFactory.replaceOneJob(jobId, editedJob)
      .then(function (job) {
        console.log(job);
      })
      .catch(function (error) {
        console.log(error);
      });
    $route.reload();
  };

  vm.deleteJob = function () {
    JobDataFactory.deleteJob(jobId)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    // $route.reload();
    $location.path("/");
  };
}
